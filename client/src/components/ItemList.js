import { Button, Card } from "antd";
import React from "react";
import { useDispatch } from "react-redux";

const ItemList = ({ item }) => {
  const dispatch = useDispatch();
  //update cart
  const handleAddToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: { ...item, quantity: 1 },
    });
  };

  const { Meta } = Card;
  return (
    <div>
      <Card
        hoverable
        style={{ width: 230, marginBottom: 20 }}
        cover={<img alt={item.name} src={item.image} style={{ height: 180 }} />}
      >
        <div className="card_info">
          <Meta className="item_name" title={item.name} />
          <Meta title={`$${item.price}`} />
        </div>
        <div className="item-button">
          <Button onClick={() => handleAddToCart()}>Add to cart</Button>
        </div>
      </Card>
    </div>
  );
};

export default ItemList;