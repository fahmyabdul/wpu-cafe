
const isTokenExpired = (token: string) => {
    if (!token) {
        return false;
    }
    const arrayToken = token.split('.');
    const tokenPayload = JSON.parse(atob(arrayToken[1]));

    return Math.floor(new Date().getTime() / 1000) >= tokenPayload?.exp;
}

export { isTokenExpired };