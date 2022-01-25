import React, { useState, useEffect, ChangeEvent } from "react";
import { Container, Typography, TextField, Button } from "@material-ui/core";
import Theme from "../../../models/Theme";
import { useHistory, useParams } from "react-router-dom";
import useLocalStorage from "react-use-localstorage";
import { post, put, searchId } from "../../../services/Service";


function RegisterTheme() {

    let history = useHistory();
    const { id } = useParams<{ id: string }>();
    const [token, setToken] = useLocalStorage("token");

    const [theme, setTheme] = useState<Theme>({
        id: 0,
        descricao: ""
    })


    useEffect(() => {
        if (token == "") {
            alert("Você precisa estar logado")
            history.push("/login")
        }
    }, [token])

    useEffect(() => {
        if (id !== undefined) {
            findById(id)
        }
    }, [id])

    async function findById(id: string) {
        searchId(`/temas/${id}`, setTheme, {
            headers: {
                "Authorization": token
            }
        })
    }

    function updatedTheme(e: ChangeEvent<HTMLInputElement>){
        setTheme({
            ...theme,
            [e.target.name]: e.target.value,
        })
    }

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        console.log("tema " + JSON.stringify(theme))

        if (id !== undefined) {
            console.log(theme)
            put(`/temas`, theme, setTheme, {
                headers: {
                    'Authorization': token
                }
            })
            alert('Tema atualizado com sucesso');
        } else {
            post(`/temas`, theme,setTheme, {
                headers: {
                    'Authorization': token
                }
            })
            alert('Tema cadastrado com sucesso');
        }
        back()

    }

    function back() {
        history.push('/temas')
    }

    return (
        <Container maxWidth="sm" className="topo">
            <form onSubmit={onSubmit}>
                <Typography variant="h3" color="textSecondary" component="h1" align="center" >Formulário de cadastro tema</Typography>
                <TextField value={theme.descricao} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedTheme(e)} id="descricao" label="descricao" variant="outlined" name="descricao" margin="normal" fullWidth />
                <Button type="submit" variant="contained" color="primary">
                    Finalizar
                </Button>
            </form>
        </Container>
    )
}

export default RegisterTheme;