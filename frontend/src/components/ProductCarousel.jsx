import { useDispatch, useSelector } from "react-redux";
import { topListProducts } from "../store/actions/product.action";
import { useEffect } from "react";
import Loader from "./Loader";
import Message from "./Message";
import { Carousel, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

const ProductCarousel = () => {
  const dispatch = useDispatch();

  const { loading, error, products } = useSelector(
    (state) => state.productTopList
  );

  useEffect(() => {
    dispatch(topListProducts());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Carousel pause="hover" className="bg-dark">
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image src={product.image} alt={product.name} fluid />
            <Carousel.Caption className="carousel-caption">
              <h2>
                {product.name} (${product.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
