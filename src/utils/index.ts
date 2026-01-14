export const convertToCamelCase = (data: any) => {
    // convert the response to camelCase
    const camelCaseData = Object.keys(data).reduce((acc: any, key: string) => {
        acc[key.replace(/_/g, " ").toLowerCase()] = data[key];
        return acc;
    }, {});
    return camelCaseData;
}

export const convertToSnakeCase = (data: any) => {
    // convert the response to snake_case
    const snakeCaseData = Object.keys(data).reduce((acc: any, key: string) => {
        acc[key.replace(/ /g, "_").toLowerCase()] = data[key];
        return acc;
    }, {});
    return snakeCaseData;
}