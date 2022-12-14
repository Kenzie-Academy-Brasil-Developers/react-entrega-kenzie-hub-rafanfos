import React from "react";
import { useContext } from "react";
import { IDataRegister, UserContext } from "../../context/UserContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Page } from "../../styles/App";
import logo from "../../assets/Logo.png";
import { StyledTitle } from "../../styles/components/typography";
import { Link } from "react-router-dom";
import { formSchemaRegister } from "../../validators";

const Register = () => {
  const { sendRegisterData } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IDataRegister>({
    resolver: yupResolver(formSchemaRegister),
  });

  return (
    <Page>
      <div className="title-div">
        <img src={logo} alt="logo" />
        <Link className="black-button" to="/">
          Voltar
        </Link>
      </div>
      <form onSubmit={handleSubmit(sendRegisterData)}>
        <StyledTitle tag="h1" className="title">
          Registro
        </StyledTitle>
        <div className="name">
          <StyledTitle tag="label" htmlFor="name">
            Nome
          </StyledTitle>
          <input type="text" id="name" {...register("name")} />
          <StyledTitle tag="p">{errors.name?.message}</StyledTitle>
        </div>
        <div className="email">
          <StyledTitle tag="label" htmlFor="email">
            Email
          </StyledTitle>
          <input type="text" id="email" {...register("email")} />
          <StyledTitle tag="p">{errors.email?.message}</StyledTitle>
        </div>
        <div className="password">
          <StyledTitle tag="label" htmlFor="password">
            Senha
          </StyledTitle>
          <input
            type="password"
            id="passwordRegister"
            {...register("password")}
          />
          <StyledTitle tag="p">{errors.password?.message}</StyledTitle>
        </div>
        <div className="confirmPassword">
          <StyledTitle tag="label" htmlFor="confirmPassword">
            Confirmar senha
          </StyledTitle>
          <input
            type="password"
            id="confirmPassword"
            {...register("confirmPassword")}
          />
          <StyledTitle tag="p">{errors.confirmPassword?.message}</StyledTitle>
        </div>
        <div className="bio">
          <StyledTitle tag="label" htmlFor="bio">
            Bio
          </StyledTitle>
          <input type="text" id="bio" {...register("bio")} />
          <StyledTitle tag="p">{errors.bio?.message}</StyledTitle>
        </div>
        <div className="contact">
          <StyledTitle tag="label" htmlFor="contact">
            Contato
          </StyledTitle>
          <input type="text" id="contact" {...register("contact")} />
          <StyledTitle tag="p">{errors.bio?.message}</StyledTitle>
        </div>
        <div className="course_module">
          <StyledTitle tag="label" htmlFor="course_module">
            M??dulo
          </StyledTitle>
          <select id="course_module" {...register("course_module")}>
            <option>Primeiro m??dulo (Introdu????o ao Frontend)</option>
            <option>Segundo m??dulo (Frontend Avan??ado)</option>
            <option>Terceiro m??dulo (Bibliotecas Frontend)</option>
            <option>Quarto m??dulo (Introdu????o ao Backend)</option>
            <option>Quinto m??dulo (Backend Avan??ado)</option>
            <option>Sexto m??dulo (Empregabilidade)</option>
          </select>
        </div>
        <button className="button" type="submit">
          Cadastrar
        </button>
      </form>
    </Page>
  );
};

export default Register;
