import { useEffect, useState } from 'react';
import Select from 'react-select';
import ButtonComponent from '../components/Button';
import { Card } from '../components/Card';
import { Divider } from '../components/Divider';
import { Col, Container, Row } from '../components/Grid';
import InputComponent from '../components/Input';

type assetsListType = {
  _id: string;
  nome: string;
};

type sensorsListType = {
  _id: string;
  nome: string;
  assetId: string;
};

type MyProps = {
  changeLoading: Function;
};

function AtivosPage({ changeLoading }: MyProps) {

  const [nomeInput, setNomeInput] = useState('');
  const [ativoInput, setAtivoInput] = useState<assetsListType | null>(null);
  const [filtroInput, setFiltroInput] = useState('');
  const [selectedAtivo, setSelectedAtivo] = useState<assetsListType | null>();
  const [assetsList, setAssetsList] = useState<assetsListType[]>([]);
  const [sensorsList, setSensorsList] = useState<sensorsListType[]>([]);


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

  const getSensorsList = (assetId: string) => {
    changeLoading(true);
    fetch(`${process.env.REACT_APP_BASE_URL}/assets/${assetId}/sensors`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setSensorsList(data);
        changeLoading(false);
      }).catch((err) => {
        console.log(err)
        changeLoading(false);
      })
  };

  const newSensor = () => {
    changeLoading(true);
    fetch(`${process.env.REACT_APP_BASE_URL}/assets/${ativoInput?._id}/sensors`, {
      method: 'POST',
      body: JSON.stringify({ nome: nomeInput }),
      headers: { "Content-type": "application/json; charset=UTF-8" }
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setNomeInput('');
        setAtivoInput(null);
        if (selectedAtivo) {
          getSensorsList(selectedAtivo._id);
        }
        changeLoading(false);
      }).catch((err) => {
        console.log(err)
        changeLoading(false);
      })
  }

  const deleteSensor = (e: any, sensorId: string, assetId: string) => {
    changeLoading(true);
    fetch(`${process.env.REACT_APP_BASE_URL}/assets/${assetId}/sensors/${sensorId}`, { method: 'DELETE' })
      .then((res) => res)
      .then((data) => {
        console.log(data);
        if (selectedAtivo) {
          getSensorsList(selectedAtivo._id);
        }
        changeLoading(false);
      }).catch((err) => {
        console.log(err)
        changeLoading(false);
      })
  }
  // -----------------------------------

  const filteredItensList = sensorsList.filter(function (el) {
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
                <Col $sm={12} $md={2} $lg={2} />
                <Col $sm={12} $md={3} $lg={3} style={{ paddingBottom: 20 }}>
                  <Select
                    value={ativoInput}
                    onChange={
                      (value) => {
                        if (value?._id) {
                          setAtivoInput(value);
                        }
                      }
                    }
                    styles={{
                      control: base => ({
                        ...base,
                        height: '58px',
                        fontSize: '19px'
                      })
                    }}
                    options={assetsList}
                    placeholder="Ativo"
                    getOptionLabel={(option) => option.nome}
                    getOptionValue={(option) => option._id}
                  />
                </Col>
                <Col $sm={12} $md={12} $lg={12}>
                  <ButtonComponent onClickAction={newSensor} label='Adicionar Sensor' color='#FA6E2D' isDisabled={nomeInput === '' || ativoInput === null} />
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
        <Row style={{ paddingBottom: 25 }}>
          <Col $sm={12} $md={12} $lg={12}>
            <Card>
              <Row>
                <Col $sm={12} $md={3} $lg={3} style={{ paddingBottom: 20 }}>
                  <Select
                    onChange={
                      (value) => {
                        if (value?._id) {
                          setSelectedAtivo(value)
                          getSensorsList(value._id);
                        }
                      }
                    }
                    styles={{
                      control: base => ({
                        ...base,
                        height: '58px',
                        fontSize: '19px',
                      })
                    }}
                    options={assetsList}
                    placeholder="Ativo"
                    getOptionLabel={(option) => option.nome}
                    getOptionValue={(option) => option._id}
                  />
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
        {sensorsList.length > 0 ?
          (
            <>
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
                                  <ButtonComponent onClickAction={(e: any) => deleteSensor(e, element._id, element.assetId)} label='Deletar' color='red' isDisabled={false} />
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
            </>
          ) : (<></>)
        }
      </Container>
    </div>
  );
}

export default AtivosPage;
