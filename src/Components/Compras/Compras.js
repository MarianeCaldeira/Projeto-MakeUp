import React, { useState } from "react";
import './Compras.css';
import { Button, Table } from 'reactstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { FiPlusCircle, FiMinusCircle } from 'react-icons/fi';
import { updateAmount } from '../../store/ducks/carts/actions';
import Header from '../Header';

const schema = yup.object().shape({
    name: yup.string().required('*Verifique se os dados foram preenchidos corretamente!'),
    endereco: yup.string().required('*Verifique se os dados foram preenchidos corretamente!'),
    email: yup.string().email('O e-mail é inválido')
        .required('*Verifique se os dados foram preenchidos corretamente!')
})

function AlertDismissible(props) {
    const { show, setShow } = props
    return (
      <>
        <Alert show={show} variant="success">
          <Alert.Heading>Compra finalizada com sucesso!</Alert.Heading>
          <p>
            Sua compra foi finalizada e o boleto gerado foi enviado para seu e-mail.
          </p>
          <hr />
          <div className="d-flex justify-content-end">
            <Button onClick={() => setShow(false)} variant="outline-success">
              Fechar!
            </Button>
          </div>
        </Alert>
      </>
    );
  }

export default function Compras() {

    const dispatch = useDispatch();

    const [subTotal, setSubTotal] = useState([])

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

    const [show, setShow] = useState(false);

    const formik = useFormik({
        initialValues: {
            name: '',
            endereco: '',
            email: ''
        },
        validationSchema: schema,
        onSubmit: values => {setShow(true)}
    })

    return (
        <div id="principal">
            <Header />
            <div id="baixo">
                <h1 id="compras">
                    EFETUE SUA COMPRA
                </h1>
                <Table striped bordered hover >
                    <thead>
                        <tr>
                            <th>
                                Produtos
                            </th>
                            <th>
                                Quantidade
                            </th>
                            <th>
                                Valor
                            </th>
                            <th>
                                SubTotal
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {carts.products.map(
                            product => (
                                <tr key={product.id}>
                                    <td>
                                        {product.name}
                                    </td>
                                    <td>
                                        <button className="menos" onClick={() => {
                                            dispatch(
                                                updateAmount(
                                                    product.id,
                                                    product.amount - 1,
                                                )
                                            )
                                        }}>
                                            <FiMinusCircle />
                                        </button>
                                        <input type="number" readOnly value={product.amount} />
                                        <button className="mais" onClick={() => {
                                            dispatch(
                                                updateAmount(
                                                    product.id,
                                                    product.amount + 1,
                                                )
                                            )
                                        }}>
                                            <FiPlusCircle />
                                        </button>
                                    </td>
                                    <td>
                                        R${product.price}
                                    </td>
                                    <td>
                                        R${product.subTotal}
                                    </td>
                                </tr>
                            ))}
                            <tr>
                                <td></td>
                                <td></td>
                                <td>
                                    Total
                                </td>
                                <td>
                                    R${carts.totalPrice}
                                </td>
                            </tr>
                    </tbody>
                </Table>
                <form id="form2" onSubmit={formik.handleSubmit}>
                    <AlertDismissible show={show} setShow={setShow} />
                    <label id="pessoal">
                        <h4>
                            <b>
                                Informações Pessoais
                            </b>
                        </h4>
                    </label>

                    <br /><br />

                    <label id="nome">
                        <b>
                            Nome Completo
                        </b>
                    </label>
                    <input type="text" id="nome1" name="name" onChange={formik.handleChange} value={formik.values.name} />
                    
                    <br />

                    {formik.errors.name && <span id="aviso">{formik.errors.name}</span>}

                    <br />

                    <label id="endereco">
                        <b>
                            Endereço de Entrega
                        </b>
                    </label>
                    <input type="text" id="endereco1" name="endereco" onChange={formik.handleChange} value={formik.values.endereco} />
                    
                    <br />

                    {formik.errors.endereco && <span id="aviso">{formik.errors.endereco}</span>}
                    
                    <br />

                    <label id="email0">
                        <b>
                            E-mail
                        </b>
                    </label>

                    <input type="email" id="email1" name="email" onChange={formik.handleChange} value={formik.values.email} />
                    
                    <br />

                    {formik.errors.email && <span id="aviso">{formik.errors.email}</span>}
                    
                    <br />

                    <section className="botao">
                        <Button color="success" id="ok" type="submit">
                            Gerar Boleto
                        </Button>
                    </section>
                </form>
            </div>
        </div>
    )
}