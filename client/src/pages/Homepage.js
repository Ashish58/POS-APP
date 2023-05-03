import React, { useState, useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout";
import axios from "axios";
import { Col, Row } from "antd";
import ItemList from "../components/ItemList";
import { useDispatch } from "react-redux";
const Homepage = () => {
  const [itemsData, setItemsData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(`drinks`);

  const categories = [
    {
      name: "drinks",
      imageUrl:
        "https://img.lovepik.com/free_png/32/44/58/77758PICFabbK171g5406_PIC2018.png_300.png",
    },
    {
      name: "rice",
      imageUrl: "https://cdn-icons-png.flaticon.com/512/123/123296.png",
    },
    {
      name: "noodles",
      imageUrl: "https://cdn-icons-png.flaticon.com/512/3041/3041130.png",
    },
    {
      name: "icecream",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROeLNZUkrVKi-CAl_FgfvwxmPx2voPm_cUzg&usqp=CAU",
    },
    {
      name: "shampoo",
      imageUrl:
        "https://www.pngall.com/wp-content/uploads/4/Shampoo-PNG-Image-File.png",
    },
    {
      name: "chips",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxIFHRl-bcVQPP57YqHDHysaCnmcIl2uvZtQ&usqp=CAU",
    },
  ];

  const dispatch = useDispatch();
  //useEffect
  useEffect(() => {
    const getAllItems = async () => {
      try {
        dispatch({
          type: "SHOW_LOADING",
        });
        const { data } = await axios.get("/api/items/get-item");
        setItemsData(data);
        dispatch({ type: "HIDE_LOADING" });
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllItems();
  }, [dispatch]);
  return (
    <DefaultLayout>
      <div className="d-flex">
        {categories.map((category) => (
          <div
            key={category.name}
            className={`d-flex category ${
              selectedCategory === category.name && "category-active"
            }`}
            onClick={() => setSelectedCategory(category.name)}
          >
            <h6>{category.name}</h6>
            <img
              src={category.imageUrl}
              alt={category.name}
              height="30"
              width="40"
            />
          </div>
        ))}
      </div>
      <Row>
        {itemsData
          .filter((i) => i.category === selectedCategory)
          .map((item) => (
            <Col xs={24} lg={6} md={12} sm={6}>
              <ItemList key={item.id} item={item} />
            </Col>
          ))}
      </Row>
    </DefaultLayout>
  );
};

export default Homepage;
