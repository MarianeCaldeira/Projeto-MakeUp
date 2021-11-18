import { useEffect, useState, useRef } from 'react';
import './Produtos.css';
import { Card, Spinner } from 'react-bootstrap';
import MakeApi from '../../services/MakeApi';
import { BsFillArrowRightCircleFill, BsFillArrowLeftCircleFill } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, updateAmount } from '../../store/ducks/carts/actions';
import Header from '../Header';
import Swal from 'sweetalert2';

function Produtos() {
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const carousel = useRef(null);

    useEffect(() => {
        MakeApi.get('/products.json')
            .then((response) => {
                setData(response.data.slice(430, 460));
                console.log(response.data);
            });
    }, []);
    const carts = useSelector((state) => {
        return {
          totalPrice: state.carts.products.reduce((total_price, transation) => {
            return total_price + transation.price * transation.amount;
          }, 0),
          products: state.carts.products.map(product => ({
            ...product,
            subTotal: product.amount * product.price,
          }))
        };
    });
    const handleAddToCart = (item) => {
        const validation = carts.products.find(prod => prod.id ===item.id)
        if(!!validation){
            dispatch(
                updateAmount(
                    validation.id,
                    validation.amount + 1,
                )
            )
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: `Foi adicionado mais um ${item.name} ao carrinho`,
                showConfirmButton: false,
                timer: 1500
            })
            return 
        }
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `O produto foi ${item.name} adicionado ao carrinho`,
            showConfirmButton: false,
            timer: 1500
          })
        dispatch(addToCart(item))
    }
    const handleLeftClick = (e) => {
        e.preventDefault();
        carousel.current.scrollLeft -= carousel.current.offsetWidth;
    };

    const handleRightClick = (e) => {
        e.preventDefault();

        carousel.current.scrollLeft += carousel.current.offsetWidth;
    };

    if (!data || !data.length) return (
        <div className="container">
            <Header />
            <div className="rodar">
                <Spinner animation="border" />
            </div>
        </div>
    );

    return (
        <div className="container">
            <Header />
            <h1 className="titulo">
                PRODUTOS
            </h1>
            <div className="carousel" ref={carousel}>
                {data.map((item) => {
                    const { id, name, price, image_link, description } = item;
                    const image = image_link;
                    return (
                        <div className="item" key={id}>
                            <Card style={{ width: '18rem', height: '450px' }}>
                                <Card.Img variant="top" src={image} height="250px" />
                                <Card.Body>
                                    <Card.Title>{name}</Card.Title>
                                    <Card.Text>
                                        R$ {price}
                                    </Card.Text>
                                    <button className="comprar" onClick={() => handleAddToCart(item)}>Adicionar ao carrinho</button>
                                </Card.Body>
                            </Card>
                        </div>
                    );
                })}
            </div>
            <div className="setas">
                <button className="left" type="button" onClick={handleLeftClick}>
                    <BsFillArrowLeftCircleFill size="50px" />
                </button>
                <button className="right" type="button" onClick={handleRightClick}>
                    <BsFillArrowRightCircleFill size="50px" />
                </button>
            </div>
        </div>
    );
}

export default Produtos;