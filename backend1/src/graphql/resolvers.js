/**
 * Created by stephan.strehler on 12.02.2018.
 */

const addresses = [
    {
        id: 1,
        street: 'First street',
        number: '4229',
        city: 'New York',
        postalCode: '36544'
    },
    {
        id: 2,
        street: 'Second street',
        number: '345',
        city: 'Boston',
        postalCode: '45442'
    },
    {
        id: 3,
        street: 'Third street',
        number: '29',
        city: 'Dallas',
        postalCode: '14156'
    }
];

const categories = [
    {
        id: 1,
        name: "technic",
        parent_id: undefined
    },
    {
        id: 2,
        name: "home and garden",
        parent_id: undefined
    },
    {
        id: 3,
        name: "kitchen",
        parent_id: 2
    }
];


const deliverers = [
    {
        id: 1,
        name: 'Dell',
        email: 'service@dell.com',
        address_id: 1
    },
    {
        id: 2,
        name: 'Garden supporter',
        email: 'garden@gardensuppert.com',
        address_id: 2
    },
    {
        id: 1,
        name: 'Brathering',
        email: 'brat@hering.com',
        address_id: 3
    }
];


const products = [
    {
        id: 1,
        name: 'notebook',
        price: 500.50,
        deliveryTime: 3,
        description: 'The top notebook from Dell.',
        deliverer_id: 1
    },
    {
        id: 2,
        name: 'tablet',
        price: 250.90,
        deliveryTime: 3,
        description: 'The top tablet from Dell.',
        deliverer_id: 1
    },
    {
        id: 3,
        name: 'kitchen nive',
        price: 25.90,
        deliveryTime: 4,
        description: 'If you cut yourself really hard.',
        deliverer_id: 3
    },
    {
        id: 4,
        name: 'saw',
        price: 55.90,
        deliveryTime: 3,
        description: 'Threre isn\'t any tree.',
        deliverer_id: 2
    },
];

const category_product = [
    {
        category_id: 1,
        product_id: 1
    },
    {
        category_id: 1,
        product_id: 2
    },
    {
        category_id: 3,
        product_id: 3
    },
    {
        category_id: 2,
        product_id: 4
    }
];


const resolveFunctions = {
        RootQuery: {
            deliverer(_, {id}) {
                return deliverers[id-1]
            },
            category(_, {name}) {
                if (!name) {
                    return categories
                }
                for(let item of categories) {
                    if(name === item.name)
                        return [item];
                }
            }
        },
        Deliverer: {
            address: {
                resolve(root) {
                    let addressIndex = root.address_id - 1;
                    return addresses[addressIndex];
                }
            }
        },
        Product: {
            categories: {
                resolve(root) {
                    let result = [];
                    let categoryIds = [];
                    let product_id = root.id;
                    for(let item of category_product){
                        if(product_id === item.product_id)
                            categoryIds.push(item.category_id);
                    }
                    for(let id of categoryIds)
                        result.push(categories[id-1]);
                    return result;
                }
            },
            deliverer: {
                resolve(root) {
                    return deliverers[root.deliverer_id - 1];
                }
            }
        },
        Category: {
            parent: {
                resolve(root) {
                    return categories[root.parent_id - 1];
                }
            },
            products: {
                resolve(root) {
                    let result = [];
                    let productIds = [];
                    let product_id = root.id;
                    for(let item of category_product){
                        if(product_id === item.category_id)
                            productIds.push(item.product_id);
                    }
                    for(let id of productIds)
                        result.push(products[id-1]);
                    return result;
                }
            }
        }
    }
;

export default resolveFunctions;