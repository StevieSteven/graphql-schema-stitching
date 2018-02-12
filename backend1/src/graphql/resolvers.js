/**
 * Created by stephan.strehler on 12.02.2018.
 */

const addresses = [{

}] ;

const deliverers = [{

}];


const resolveFunctions = {
        RootQuery: {

            deliverer(_, {id}) {
                return CustomerDB.findById(id);

            },
            Category(_, {name}) {
                if (!name) {
                    return CategoryDB.findAll();
                }
                return CategoryDB.findAll({where: {name: name}});
            },
            Orders(_, {id}) { //TODO with start and end
                if (!id) {
                    return OrderDB.findAll();
                }
                return OrderDB.findById(id);
            }
        },
        Customer: {
            address: {
                resolve(customer) {
                    return AddressDB.findAll({where: {customer_id: customer.id}});
                }
            }
            ,
            shoppingcard: {
                resolve(customer) {
                    return ShoppingcardDB.findOne({where: {customer_id: customer.id}});
                }
            }
            ,
            orders: {
                resolve(customer) {
                    return OrderDB.findAll({where: {customer_id: customer.id}});
                }
            }
            ,
            ratings: {
                resolve(customer) {
                    return RatingDB.findAll({where: {customer_id: customer.id}});
                }
            }
        }
        ,
        Shoppingcard: {
            customer: {
                resolve(shoppingcard) {
                    return CustomerDB.findById(shoppingcard.customer_id);

                }
            }
            ,
            products: {
                resolve(shoppingcard) {
                    return ShoppingcardElementDB.findAll({where: {shoppingcard_id: shoppingcard.id}})
                }
            }
            ,
        }
        ,
        ShoppingcardElement: {
            product: {
                resolve(shoppingcardelement) {
                    return ProductDB.findById(shoppingcardelement.product_id);
                }
            }
        }
        ,
        Product: {
            ratings: {
                resolve(product) {
                    return RatingDB.findAll({where: {product_id: product.id}});
                }
            }
            ,
            categories: {
                resolve(product) {
                    return ProductDB.getCategories(product.id);
                }
            }
        }
        ,
        Rating: {
            customer: {
                resolve(rating) {
                    return CustomerDB.findById(rating.customer_id);
                }
            }
            ,
            product: {
                resolve(rating) {
                    return ProductDB.findById(rating.product_id);
                }
            }
        }
        ,
        Category: {
            parent: {
                resolve(category) {
                    return CategoryDB.findById(category.parent_id);
                }
            }
            ,
            products: {
                resolve(category) {
                    return CategoryDB.getProducts(category.id);
                }
            }
        }
        ,
        Order: {
            items: {
                resolve(order) {
                    return OrderItemDB.findAll({where: {order_id: order.id}})
                }
            }
            ,
            customer: {
                resolve(order) {
                    return CustomerDB.findById(order.customer_id)
                }
            }
            ,
            address: {
                resolve(order) {
                    return AddressDB.findById(order.address_id)
                }
            }
            ,
            status: {
                resolve(order) {
                    return OrderStatusDB.findById(order.status_id)
                }
            }
            ,
        }
        ,
        OrderItem: {
            product: {
                resolve(orderitem) {
                    return ProductDB.findById(orderitem.product_id);
                }
            }
        }
    }
;

export default resolveFunctions;