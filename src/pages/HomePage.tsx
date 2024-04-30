import { useEffect, useState } from 'react';
import ButtonComponent from '../components/Button';
import { Card } from '../components/Card';
import { Divider } from '../components/Divider';
import { Col, Container, Row } from '../components/Grid';
import InputComponent from '../components/Input';

type assetsListType = {
  _id: string;
  nome: string;
};

type MyProps = {
  changeLoading: Function;
};

function HomePage({ changeLoading }: MyProps) {

  const [nomeInput, setNomeInput] = useState('');
  const [filtroInput, setFiltroInput] = useState('');
  const [assetsList, setAssetsList] = useState<assetsListType[]>([]);

  useEffect(() => {
    getAssetsList();
  }, [])

  const handleNomeInputChange = (text: string) => {
    setNomeInput(text);
  }

  const handleFiltroInputChange = (text: string) => {
    setFiltroInput(text);
  }

  // HTTP Calls
  // -----------------------------------
  const getAssetsList = () => {
    changeLoading(true);
    fetch(`${process.env.REACT_APP_BASE_URL}/assets`)
      .then((res) => res.json())
      .then((data) => {
        setAssetsList(data);
        changeLoading(false);
      }).catch((err) => {
        console.log(err)
        changeLoading(false);
      })
  };

  const newAsset = () => {
    changeLoading(true);
    fetch(`${process.env.REACT_APP_BASE_URL}/assets`, {
      method: 'POST',
      body: JSON.stringify({ nome: nomeInput }),
      headers: { "Content-type": "application/json; charset=UTF-8" }
    })
      .then((res) => res.json())
      .then((data) => {
        handleNomeInputChange('');
        getAssetsList();
        changeLoading(false);
      }).catch((err) => {
        console.log(err)
        changeLoading(false);
      })
  }

  const deleteAsset = (e: any, id: string) => {
    changeLoading(true);
    fetch(`${process.env.REACT_APP_BASE_URL}/assets/${id}`, { method: 'DELETE' })
      .then((res) => res)
      .then((data) => {
        getAssetsList();
        changeLoading(false);
      }).catch((err) => {
        console.log(err)
        changeLoading(false);
      })
  }
  // -----------------------------------

  const filteredItensList = assetsList.filter(function (el) {
    return el.nome.toUpperCase().includes(filtroInput.toUpperCase());
  });

  return (
      <div style={{ padding: '25px 15px' }}>
        <Container>
          <Row style={{ paddingBottom: 25 }}>
            <Col $sm={12} $md={12} $lg={12}>
              <Card>
                <Row>
                  <Col $sm={12} $md={3} $lg={3} style={{ paddingBottom: 20 }}>
                    <InputComponent type='text' height={42} width={250} label="Nome" value={nomeInput} onValueChange={handleNomeInputChange} />
                  </Col>
                  <Col $sm={12} $md={12} $lg={12}>
                    <ButtonComponent onClickAction={newAsset} label='Adicionar Ativo' color='#FA6E2D' isDisabled={nomeInput === ''} />
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
          {assetsList.length > 0 ?
            (<>
              <Row>
                <Col $sm={12} $md={3} $lg={3}>
                  <InputComponent type='text' height={42} width={250} label="Filtro" value={filtroInput} onValueChange={handleFiltroInputChange} />
                </Col>
              </Row>
              <Row style={{ paddingTop: 25 }}>
                <Col $sm={12} $md={12} $lg={12}>
                  <Card>
                    <Row>
                      <Col $sm={12} $md={12} $lg={12}>
                        <Container>
                          {filteredItensList.map((element) => (
                            <div key={element._id} >
                              <Row style={{ marginTop: '12px', marginBottom: '12px' }}>
                                <Col $sm={12} $md={9} $lg={10}>
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
                                <Col style={{ paddingTop: 16, paddingBottom: 10 }} $sm={12} $md={3} $lg={2}>
                                  <ButtonComponent onClickAction={(e: any) => deleteAsset(e, element._id)} label='Deletar' color='red' isDisabled={false} />
                                </Col>
                              </Row>
                              <Divider />
                            </div>
                          ))}
                        </Container>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              </Row>
            </>)
            :
            (<></>)
          }
        </Container>
      </div >
  );
}

export default HomePage;
