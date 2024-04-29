import { useEffect, useState } from 'react';
import styled from 'styled-components';
import ButtonComponent from '../components/Button';
import { Row, Col, Container } from '../components/Grid';
import InputComponent from '../components/Input';

type assetsListType = {
  _id: string;
  nome: string;
};

const Card = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 10px;
  border: 1px solid #e9e9e9;
  display: flex;
`;

const Divider = styled.hr`
  border-top: 1px solid #e9e9e9;
`;


function HomePage() {

  const [nome, setNome] = useState('');
  const [filtro, setFiltro] = useState('');
  const [assetsList, setAssetsList] = useState<assetsListType[]>([]);

  useEffect(() => {
    getAssetsList();
  }, [])

  const getAssetsList = () => {
    fetch(`${process.env.REACT_APP_BASE_URL}/assets`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setAssetsList(data);
      }).catch((err) => {
        console.log(err)
      })
  };

  const changeNomeValue = (text: string) => {
    setNome(text);
  }

  const changeFiltroValue = (text: string) => {
    setFiltro(text);
  }

  const newAsset = () => {
    fetch(`${process.env.REACT_APP_BASE_URL}/assets`, {
      method: 'POST',
      body: JSON.stringify({ nome }),
      headers: { "Content-type": "application/json; charset=UTF-8" }
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setNome('');
        getAssetsList();
      }).catch((err) => {
        console.log(err)
      })
  }

  const deleteAsset = (e: any, id: string) => {
    console.log(`deleteAsset: ${id}`);
    fetch(`${process.env.REACT_APP_BASE_URL}/assets/${id}`, { method: 'DELETE' })
      .then((res) => res)
      .then((data) => {
        console.log(data);
        getAssetsList();
      }).catch((err) => {
        console.log(err)
      })
  }

  const filteredItensList = assetsList.filter(function (el) {
    return el.nome.toUpperCase().includes(filtro.toUpperCase());
  });

  const ListItem = () => (
    <Container>
      {filteredItensList.map((element) => (
        <div key={element._id} >
          <Row style={{ marginTop: '12px', marginBottom: '12px' }}>
            <Col $sm={12} $md={10} $lg={10}>
              <Col $sm={12} $md={12} $lg={12}>
                <p style={{ margin: 0, fontSize: '18px', padding: '4px' }}>
                  <span style={{ fontWeight: 'bolder' }}>Nome: </span>
                  <span>{element.nome}</span>
                </p>
              </Col>
              <Col $sm={12} $md={12} $lg={12}>
                <p style={{ margin: 0, fontSize: '15px', padding: '4px', color: '#716f6f' }}>
                  <span style={{ fontWeight: 'bolder' }}>ID: </span>
                  <span>{element._id}</span>
                </p>
              </Col>
            </Col>
            <Col style={{ paddingTop: 16, paddingBottom: 10 }} $sm={12} $md={2} $lg={2}>
              <ButtonComponent onClickAction={(e: any) => deleteAsset(e, element._id)} label='Deletar' color='red' isDisabled={false}/>
            </Col>
          </Row>
          <Divider />
        </div>
      ))}
    </Container>
  );


  return (
    <div style={{ padding: '25px 15px' }}>
      <Container>
        <Row style={{ paddingBottom: 25 }}>
          <Col $sm={12} $md={12} $lg={12}>
            <Card>
              <Row>
                <Col $sm={12} $md={3} $lg={3} style={{ paddingBottom: 20 }}>
                  <InputComponent type='text' height={42} width={250} label="Nome" value={nome} onValueChange={changeNomeValue} />
                </Col>
                <Col $sm={12} $md={12} $lg={12}>
                  <ButtonComponent onClickAction={newAsset} label='Adicionar Ativo' color='#FA6E2D' isDisabled={nome === ''}/>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
        {assetsList.length > 0 ?
          (
            <>
              <Row>
                <Col $sm={12} $md={3} $lg={3}>
                  <InputComponent type='text' height={42} width={250} label="Filtro" value={filtro} onValueChange={changeFiltroValue} />
                </Col>
              </Row>
              <Row style={{ paddingTop: 25 }}>
                <Col $sm={12} $md={12} $lg={12}>
                  <Card>
                    <Row>
                      <Col $sm={12} $md={12} $lg={12}>
                        <ListItem />
                      </Col>
                    </Row>
                  </Card>
                </Col>
              </Row>
            </>
          ) : (<></>)
        }
      </Container>
    </div>
  );
}

export default HomePage;
