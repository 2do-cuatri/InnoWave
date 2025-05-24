export default function useUser() {
    const getUser = () => {
        const user = localStorage.getItem('user')
        return user;
    }

    return { getUser }
}