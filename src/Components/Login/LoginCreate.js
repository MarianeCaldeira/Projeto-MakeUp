import React, { useState } from 'react';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import * as history from "history";
import * as yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useFormik } from 'formik';
import { Alert } from 'react-bootstrap';

const schema = yup.object().shape({
  username: yup.string().required('*Verifique se os dados foram preenchidos!'),
  email: yup.string().email('O e-mail é inválido')
    .required('*Verifique se os dados foram preenchidos!'),
  password: yup.string().required('*Verifique se os dados foram preenchidos!')
})

function AlertDismissible(props) {
  const { show, setShow } = props
  return (
    <>
      <Alert show={show} variant="success">
        <Alert.Heading>Cadastro Concluído!</Alert.Heading>
        <p>
          Seu cadastro foi concluído com sucesso, volte para tela de login pra acessar sua
          conta e navegar em nosso site.
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

const LoginCreate = () => {

  const [show, setShow] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: ''
    },
    validationSchema: schema,
    onSubmit: values => {setShow(true)}
  })

  return (
    <>
      <AlertDismissible show={show} setShow={setShow} />
      <section>
        <h1 className="title">Cadastre-se</h1>
        <form onSubmit={formik.handleSubmit}>
          <Input label="Usuário" type="text" name="username" className="escrever" onChange={formik.handleChange} value={formik.values.username} />
          {formik.errors.username && <span className="aviso">{formik.errors.username}</span>}
          <Input label="Email" type="email" name="email" className="email" onChange={formik.handleChange} value={formik.values.email} />
          {formik.errors.email && <span className="aviso">{formik.errors.email}</span>}
          <Input label="Senha" type="password" name="password" className="escrever" onChange={formik.handleChange} value={formik.values.password} />
          {formik.errors.password && <span className="aviso">{formik.errors.password}</span>}
          <br />
          <Button type="submit">Cadastrar</Button>
        </form>
      </section>
    </>
  );
};

export default LoginCreate;
