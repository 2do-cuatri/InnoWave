import {
  Box,
  Container,
  Heading,
  useColorModeValue,
  VStack,
  SimpleGrid,
  Flex,
  Text,
} from "@chakra-ui/react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useEffect } from "react";
import { useProductStore } from "../store/product";
import { useReportStore } from "../store/report";

const ReportPage = () => {
  const { products, fetchProducts } = useProductStore();
  const { report, getReport } = useReportStore();

  useEffect(() => {
    fetchProducts();
    getReport();
  }, [fetchProducts, getReport]);

  const {
    prodQuantity,
    minPrice,
    maxPrice,
    avgPrice,
    totalStock,
    avgStock,
  } = report;

  const stockChartData = products.map((p) => ({
    name: p.name,
    stock: Number(p.stock) || 0,
  }));

  const formatoPrecio = Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  });

 const borderColor = useColorModeValue("gray.200", "gray.600");
 const headerColor = useColorModeValue("blue.600", "blue.300")
  
  return (
    <Container maxW={"container.md"}>
      <VStack spacing={8}>
        <Heading
          as="h1"
          size="xl"
          textAlign="center"
          mb={8}
          color={useColorModeValue("blue.700", "blue.300")}
        >
          Reporte de Stock
        </Heading>

        <Box
          w="full"
          bg={useColorModeValue("white", "gray.700")}
          p={6}
          rounded="lg"
          shadow="md"
        >
          {stockChartData.length > 0 ? (
            <VStack spacing={6} align="stretch">
              <SimpleGrid columns={{ base: 1 }} spacing={0} w="full">
                <Flex
                  justifyContent="space-between"
                  p={2}
                  borderBottom="1px solid"
                  borderColor={borderColor}
                >
                  <Text fontWeight="medium">Total de productos</Text>
                  <Text fontWeight="bold">{prodQuantity}</Text>
                </Flex>
                <Flex
                  justifyContent="space-between"
                  p={2}
                  borderBottom="1px solid"
                  borderColor={borderColor}
                >
                  <Text fontWeight="medium">Stock total</Text>
                  <Text fontWeight="bold">{totalStock}</Text>
                </Flex>
                <Flex 
                  justifyContent="space-between"
                  p={2}
                  borderBottom="1px solid"
                  borderColor={borderColor}
                >
                  <Text fontWeight="medium">Stock promedio</Text>
                  <Text fontWeight="bold">{avgStock.toFixed(2)}</Text>
                </Flex>
                <Flex
                  borderBottom="1px solid"
                  borderColor={borderColor}
                  justifyContent="space-between"
                  p={2}
                >
                  <Text fontWeight="medium">Precio promedio</Text>
                  <Text fontWeight="bold">{formatoPrecio.format(avgPrice)}</Text>
                </Flex>
                <Flex 
                  justifyContent="space-between" 
                  p={2}
                  borderBottom="1px solid"
                  borderColor={borderColor}
                >
                  <Text fontWeight="medium">Menor precio</Text>
                  <Text fontWeight="bold">{formatoPrecio.format(minPrice)}</Text>
                </Flex>
                <Flex justifyContent="space-between" p={2}>
                  <Text fontWeight="medium">Mayor precio</Text>
                  <Text fontWeight="bold">{formatoPrecio.format(maxPrice)}</Text>
                </Flex>
              </SimpleGrid>
             <Heading
                as="h2"
                size="md"
                mb={4}
                color={headerColor}
                textAlign="center"
                w="full"
              >
                Stock por producto
              </Heading>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={stockChartData} margin={{ bottom: 60 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="name"
                    angle={-60}
                    textAnchor="end"
                    interval={0}
                    height={100}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="stock" fill="#3182CE" />
                </BarChart>
              </ResponsiveContainer>
            </VStack>
          ) : (
            <Heading size="md" textAlign="center">
              No hay datos disponibles
            </Heading>
          )}
        </Box>
      </VStack>
    </Container>
  );
};

export default ReportPage;