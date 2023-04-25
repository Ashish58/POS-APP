import { Button, Card } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const ItemList = ({ item }) => {
  const dispatch = useDispatch();
  //update cart
  const { cartItems } = useSelector((state) => state.rootReducer);
  const handleAddToCart = (id) => {
    let flag = false;
    // eslint-disable-next-line array-callback-return
    cartItems.map((item) => {
      if (item._id === id) {
        flag = true;
        item.quantity = item.quantity + 1;
      }
    });
    if (flag !== true) {
      dispatch({
        type: "ADD_TO_CART",
        payload: { ...item, quantity: 1 },
      });
    }
  };

  const { Meta } = Card;
  return (
    <div>
      <Card
        hoverable
        style={{ width: 230, marginBottom: 20 }}
        cover={
          <img
            alt={item.name}
            src={item.image}
            style={{ width: 200, height: 180 }}
          />
        }
      >
        <div className="card_info">
          <Meta className="item_name" title={item.name} />
          <Meta title={`$${item.price}`} />
        </div>
        <div className="item-button">
          <Button type="primary" onClick={() => handleAddToCart(item._id)}>
            Add to cart
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ItemList;
