
export const customSort = (array: any[], property: string, desc: boolean) => {
    return array.sort((a, b) => {
        let order = desc ? 1 : -1;

        if (Array.isArray(a[property])) {
            const tagsA = a[property].sort().join('');
            const tagsB = b[property].sort().join('');

            return order * tagsA.localeCompare(tagsB);
        }

        if (property === 'address') {
            const addressA = a[property].replaceAll(/[0-9.,]+/g, '')
            const addressB = b[property].replaceAll(/[0-9.,]+/g, '')
            
            return order * addressA.localeCompare(addressB);
        }

        switch (typeof a[property]) {
            case "string":
                return order * (a[property].localeCompare(b[property]));
            case "number":
                return order * ((a[property] - b[property]));
            case "object":
                return order * (a[property].name.localeCompare(b[property].name));
            default:
                return 0;
        }
    })
}
