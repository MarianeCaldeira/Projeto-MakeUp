import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as history from "history";
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useFormik } from 'formik';
import { Alert } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

import styles from './LoginForm.module.css';
import stylesBtn from '../Forms/Button.module.css';

import * as yup from 'yup';

const schema = yup.object().shape({
  email: yup.string().email('O e-mail é inválido')
    .required('*Verifique se os dados foram preenchidos!'),
  password: yup.string().required('*Verifique se os dados foram preenchidos!')
})

function AlertDismissible(props) {
  const { show, setShow } = props
  return (
    <>
      <Alert show={show} variant="success">
        <Alert.Heading>Estamos em manutenção!</Alert.Heading>
        <p>
          Desculpe, estamos em manutenção. Para recuperar sua senha entre em contato em nosso
          e-mail: lojamakeup@gmail.com
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

const LoginForm = () => {

  const [show, setShow] = useState(false);

  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: schema,
    onSubmit: values => {
      sessionStorage.setItem('makeup', 'logado')
      navigate("/home")
    },
  })

  return (
    <div className="geral">
      <section className="animeLeft">
        <h1 className="title">Login</h1>
        <form className={styles.form} onSubmit={formik.handleSubmit}>
          <Input label="E-mail" type="email" name="email" className="email" onChange={formik.handleChange} value={formik.values.email} />
          {formik.errors.email && <span>{formik.errors.email}</span>}

          <Input label="Senha" type="password" name="password" className="escrever" onChange={formik.handleChange} value={formik.values.password} />
          {formik.errors.password && <span>{formik.errors.password}</span>}
          <br />
          <Button type="submit" className={stylesBtn.button}>
            Entrar
          </Button>
        </form>
        <AlertDismissible show={show} setShow={setShow} />
        <div id="esquecer" className={styles.perdeu} onClick={() => setShow(true)}>
          Esqueceu a Senha? Clique aqui.
        </div>
        <div className={styles.cadastro}>
          <h2 className={styles.subtitle}>Cadastre-se</h2>
          <p>Ainda não possui conta? Cadastre-se no site.</p>
          <Link className={stylesBtn.button} to="/login/criar">
            Cadastro
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LoginForm;