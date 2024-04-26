import React from 'react';
import ListComponent from '../components/List';
import styled from 'styled-components';
import ButtonComponent from '../components/Button';
import { Row, Col } from '../components/Grid';


function HomePage() {

  const assetsList = [
    { _id: '66288101d3ee5254ec8dbcea', nome: 'Ativo 1' },
    // { _id: '66288107d3ee5254ec8dbcec', nome: 'Ativo 99' },
  ];

  return (
    <div style={{ padding: '25px 15px' }}>
      <Row className='justify-end'>
        <Col $sm={12} $md={3} $lg={2}>
          <ButtonComponent label='Adicionar Ativo' />
        </Col>
      </Row>
      <Row style={{ paddingTop: '15px' }}>
        <Col $sm={12} $md={12} $lg={12}>
          <ListComponent filter={'nome'} itensList={assetsList} />
        </Col>
      </Row>

    </div>
  );
}

export default HomePage;
