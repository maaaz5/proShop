import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import Loader from "./Loader";
import Message from "./Message";
import { listTopProducts } from "../actions/productActions";

const ProductCarousel = () => {
  const dispatch = useDispatch();

  const productTopRated = useSelector((state) => state.productTopRated);
  const { loading, error, products } = productTopRated;

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);
  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant={"danger"}> {error}</Message>
  ) : (
    <Carousel pause="hover" className="bg-dark">
      {products.map((prod) => (
        <Carousel.Item key={prod._id}>
          <Link to={`/product/${prod._id}`}>
            <Image src={prod.image} alt={prod.name} fluid />
            <Carousel.Caption className="carousel-caption">
              <h2>
                {prod.name} (${prod.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
