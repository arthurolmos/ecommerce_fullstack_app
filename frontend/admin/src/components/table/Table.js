import React, { useState } from 'react';
import MaterialTable, { MTableBodyRow, MTableCell } from 'material-table';
import { useLocation, useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import { confirmAlert } from 'react-confirm-alert'

import api from '../../services/api'
import styled, { css } from 'styled-components'

export default function Table({ columns, data, isEditable=false }) {

    const location = useLocation()
    const history = useHistory()

    const [state, setState] = useState({
        columns: columns,
        data: data
    });

    return (
        <MaterialTable
            title="Usuários"
            columns={state.columns}
            data={state.data}
            actions={[
                {
                    icon: 'edit',
                    tooltip: 'Editar',
                    onClick: (event, rowData) =>  { history.push(location.pathname + '/edit/' + rowData.id) }
                },
                {
                    icon: 'delete',
                    tooltip: 'Excluir',
                    onClick: (event, rowData) =>  { 
                        confirmAlert({
                            title: 'Excluir',
                            message: 'Deseja confirmar a exclusão?',
                            buttons: [
                              {
                                label: 'Sim',
                                onClick: async() => { 
                                    try { 
                                        await api.delete(location.pathname + '/' + rowData.id) 
                                        
                                        setState((prevState) => {
                                            const data = [...prevState.data]
                                            data.splice(data.indexOf(rowData), 1)
                                            return { ...prevState, data }
                                        })
                                        
                                    } catch(err) { 
                                        console.log('ERROR', err)
                                    }
                                }
                              },
                              {
                                label: 'Não',
                                onClick: () => { return }
                              }
                            ]
                        });
                    }
                }
            ]}
            components={{
                Row: props => (
                    <MTableBodyRowStyled 
                        // onDoubleClick={() => history.push(location.pathname + '/edit/' + props.data.id)}
                        {...props} 
                    />
                ),
                Cell: props => {
                    const value = typeof props.value === 'boolean' ? 
                                        props.value === true ? 
                                            <FontAwesomeIcon icon={faCheck} /> 
                                            :  
                                            <FontAwesomeIcon icon={faTimes} /> 
                                    : props.value
                    return (
                        <MTableCellStyled
                            {...props} 
                            value={value}
                        />
                    )
                }
            }}
            editable={isEditable ? 
                {
                    onRowAdd: async (newData) => {
                        try { 
                            const resp = await api.post('/users', newData)
                            const user = resp.data
                            console.log('USER CREATED', user)

                            setState((prevState) => {
                                const data = [...prevState.data];
                                data.push(user);
                                return { ...prevState, data };
                            });
                        } catch (err) { 
                            console.log('Error on create User!')
                        }
                    },

                    onRowUpdate: (newData, oldData) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                        resolve();
                        if (oldData) {
                            setState((prevState) => {
                            const data = [...prevState.data];
                            data[data.indexOf(oldData)] = newData;
                            return { ...prevState, data };
                            });
                        }
                        }, 600);
                    }),

                    onRowDelete: (oldData) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                        resolve();
                        setState((prevState) => {
                            const data = [...prevState.data];
                            data.splice(data.indexOf(oldData), 1);
                            return { ...prevState, data };
                        });
                        }, 600);
                    }),
                } : null
            }
        />
    );
}


const MTableBodyRowStyled = styled(MTableBodyRow)`
    // cursor: pointer;

    &:hover { 
        opacity: .7;
    }
`

const MTableCellStyled = styled(MTableCell)`
    // ${props => props.value === true && css`
    //     &::after { 
    //         content: 'HEIL';
    //     }
    // `}
`