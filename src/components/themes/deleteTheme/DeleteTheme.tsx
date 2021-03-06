import React, { ChangeEvent, useEffect, useState } from 'react'
import {Box, Card, CardActions, CardContent, Button, Typography} from '@material-ui/core';
import './DeleteTheme.css';
import { useHistory, useParams } from 'react-router-dom';
import { deleteId, searchId } from '../../../services/Service';
import Theme from '../../../models/Theme';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';
import {toast} from "react-toastify"

function DeleteTheme(){
    let history = useHistory();
    const { id } = useParams<{ id: string }>();
    const token = useSelector<TokenState,TokenState["tokens"]>(
      (state)=> state.tokens
    );

    const [theme, setTheme] = useState<Theme>()

    useEffect(() => {
        if (token == "") {
          toast.error("Você precisa estar logado",{
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false, 
            theme: "colored",
            progress: undefined
          });
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

    function yes() {
        history.push('/temas')
        deleteId(`/temas/${id}`, {
          headers: {
            'Authorization': token
          }
        });
        toast.success("Tema deletado com sucesso",{
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false, 
          theme: "colored",
          progress: undefined
        });
        ;
      }
    
      function no() {
        history.push('/temas')
      }

    return (
        <>
          <Box m={2}>
            <Card variant="outlined">
              <CardContent>
                <Box justifyContent="center">
                  <Typography color="textSecondary" gutterBottom>
                   Tem certeza que deseja deletar o tema  {theme?.descricao}  ?
                  </Typography>
                </Box>
              </CardContent>
              <CardActions>
                <Box display="flex" justifyContent="start" ml={1.0} mb={2} >
                  <Box mx={2}>
                    <Button onClick={yes} variant="contained" className="marginLeft button" size='large' color="primary">
                      Sim
                    </Button>
                  </Box>
                  <Box mx={2}>
                    <Button onClick={no} variant="contained" size='large' color="secondary" className='btnCancel'>
                      Não
                    </Button>
                  </Box>
                </Box>
              </CardActions>
            </Card>
          </Box>
        </>
      );
}

export default DeleteTheme;