import { jest } from "@jest/globals";


jest.unstable_mockModule("../models/product.model.js", () => {
  // Mockea Product como función constructora
  const Product = jest.fn();
  Product.find = jest.fn();
  Product.findByIdAndUpdate = jest.fn();
  Product.findByIdAndDelete = jest.fn();
  return { default: Product };
});
jest.unstable_mockModule("mongoose", () => ({
  default: {
    Types: {
      ObjectId: {
        isValid: jest.fn().mockReturnValue(true), 
      },
    },
  },
}));

const { getProducts, createProduct, updateProduct, updateProductStock, deleteProduct } = await import("./product.controller.js");
const Product = (await import("../models/product.model.js")).default;
const mongoose = (await import("mongoose")).default;

describe("Controlador de productos", () => {
  let req, res;

  beforeEach(() => {
    req = { body: {}, params: {}, query: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  describe("getProducts", () => {
    test("debe devolver los productos correctamente", async () => {
      Product.find.mockResolvedValue([{ name: "Test" }]);
      await getProducts(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ success: true, data: [{ name: "Test" }] });
    });

    test("debe manejar errores al obtener productos", async () => {
      Product.find.mockRejectedValue(new Error("fail"));
      await getProducts(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ success: false, message: "fail" });
    });
  });

  describe("createProduct", () => {
    test("debe devolver 400 si faltan campos obligatorios", async () => {
      req.body = { name: "A" };
      await createProduct(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ success: false, message: "Todos los campos son obligatorios" });
    });

    test("debe crear y devolver el producto correctamente", async () => {
      req.body = { name: "A", price: 1, image: "img.png" };
      const saveMock = jest.fn().mockResolvedValue();
      const Product = (await import("../models/product.model.js")).default;
      Product.mockImplementation(() => ({
        ...req.body,
        save: saveMock,
      }));
      global.Product = Product;
      await createProduct(req, res);
      expect(saveMock).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ success: true, data: expect.objectContaining(req.body) });
      expect(global.Product).toEqual(Product);
    });

    test("debe manejar errores al guardar el producto", async () => {
      req.body = { name: "A", price: 1, image: "img.png" };
      const saveMock = jest.fn().mockRejectedValue(new Error("fail"));
      Product.mockImplementation(() => ({
        ...req.body,
        save: saveMock,
      }));
      await createProduct(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ success: false, message: "fail" });
    });
  });

  describe("updateProduct", () => {
    test("debe devolver 404 si el id es inválido", async () => {
      mongoose.Types.ObjectId.isValid.mockReturnValue(false);
      req.params.id = "badid";
      await updateProduct(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ success: false, message: "Producto no encontrado" });
    });

    test("debe actualizar y devolver el producto correctamente", async () => {
      mongoose.Types.ObjectId.isValid.mockReturnValue(true);
      req.params.id = "goodid";
      req.body = { name: "B" };
      Product.findByIdAndUpdate.mockResolvedValue({ name: "B" });
      await updateProduct(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ success: true, data: { name: "B" } });
    });

    test("debe manejar errores al actualizar el producto", async () => {
      mongoose.Types.ObjectId.isValid.mockReturnValue(true);
      req.params.id = "goodid";
      req.body = { name: "B" };
      Product.findByIdAndUpdate.mockRejectedValue(new Error("fail"));
      await updateProduct(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ success: false, message: "fail" });
    });
  });

  describe("updateProductStock", () => {
    test("debe devolver 404 si el id es inválido", async () => {
      mongoose.Types.ObjectId.isValid.mockReturnValue(false);
      req.params.id = "badid";
      req.body.stock = 10;
      await updateProductStock(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ success: false, message: "Producto no encontrado" });
    });

    test("debe devolver 400 si el stock es inválido", async () => {
      mongoose.Types.ObjectId.isValid.mockReturnValue(true);
      req.params.id = "goodid";
      req.body.stock = -1;
      await updateProductStock(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ success: false, message: "El stock debe ser un número mayor o igual a 0" });
    });

    test("debe actualizar y devolver el stock correctamente", async () => {
      mongoose.Types.ObjectId.isValid.mockReturnValue(true);
      req.params.id = "goodid";
      req.body.stock = 5;
      Product.findByIdAndUpdate.mockResolvedValue({ stock: 5 });
      await updateProductStock(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ success: true, data: { stock: 5 } });
    });

    test("debe manejar errores al actualizar el stock", async () => {
      mongoose.Types.ObjectId.isValid.mockReturnValue(true);
      req.params.id = "goodid";
      req.body.stock = 5;
      Product.findByIdAndUpdate.mockRejectedValue(new Error("fail"));
      await updateProductStock(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ success: false, message: "fail" });
    });
  });

  describe("deleteProduct", () => {
    test("debe eliminar y devolver éxito", async () => {
      req.params.id = "goodid";
      Product.findByIdAndDelete.mockResolvedValue({});
      await deleteProduct(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ success: true, message: "Producto eliminado" });
    });

    test("debe devolver 404 si el id es inválido", async () => {
      mongoose.Types.ObjectId.isValid.mockReturnValue(false);
      req.params.id = "badid";
      await deleteProduct(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ success: false, message: "Producto no encontrado" });
    });

    test("debe manejar errores al eliminar el producto", async () => {
      mongoose.Types.ObjectId.isValid.mockReturnValue(true);
      req.params.id = "goodid";
      Product.findByIdAndDelete.mockRejectedValue(new Error("fail"));
      await deleteProduct(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ success: false, message: "fail" });
    });
  });
});