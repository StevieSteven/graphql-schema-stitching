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



const resolveFunctions = {
        RootQuery: {
            deliverer(_, {id}) {
                console.log('deliverer wurde abgefragt. ID: ', id);
                return deliverers[id-1]
            }
        },
        Deliverer: {
            address: {
                resolve(root) {
                    let addressIndex = root.address_id - 1;
                    return addresses[addressIndex];
                }
            }
        }
    }
;

export default resolveFunctions;