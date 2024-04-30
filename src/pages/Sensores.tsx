import ReactEcharts from "echarts-for-react";
import { useEffect, useState } from 'react';
import Select from 'react-select';
import styled from 'styled-components';
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
};

type sensorDataListType = {
  _id: string;
  sensorId: string;
  valor: number;
  data: string;
};

type ChartOption = {
  xAxis: {
    type: string,
    data: string[]
  },
  yAxis: {
    type: string
  },
  series: [
    {
      data: number,
      type: string
    }
  ],
  tooltip: {
    trigger: string,
    axisPointer: {
      type: string,
    },
  },
};

const ChartCard = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 10px;
  border: 1px solid #e9e9e9;
  height: 100%;
`;


function SensoresPage() {

  const [valorInput, setValorInput] = useState('');
  const [dataInput, setDataInput] = useState('');
  const [ativoInput, setAtivoInput] = useState<assetsListType | null>(null);
  const [sensorInput, setSensorInput] = useState<sensorsListType | null>(null);
  const [inputSensorsList, setInputSensorsList] = useState<sensorsListType[]>([]);
  const [filtroInput, setFiltroInput] = useState('');
  const [chartOption, setChartOption] = useState<ChartOption | null>(null);
  const [selectedAtivo, setSelectedAtivo] = useState<assetsListType | null>();
  const [selectedSensor, setSelectedSensor] = useState<sensorsListType | null>();
  const [assetsList, setAssetsList] = useState<assetsListType[]>([]);
  const [sensorsList, setSensorsList] = useState<sensorsListType[]>([]);
  const [sensorDataList, setSensorDataList] = useState<sensorDataListType[]>([]);


  useEffect(() => {
    getAssetsList();
    getAssetsChartOption();
  }, []);


  const handleValorInputChange = (text: string) => {
    setValorInput(text);
  }

  const handleDataInputChange = (text: string) => {
    setDataInput(text);
  }
  
  const handleFiltroInputChange = (text: string) => {
    setFiltroInput(text);
  }

  // HTTP Calls
  // -----------------------------------
  // List
  // ______________________
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

  const getSensorsList = (assetId: string, isNewField: boolean) => {
    fetch(`${process.env.REACT_APP_BASE_URL}/sensors/${assetId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (isNewField) {
          setInputSensorsList(data)
        } else {
          setSensorsList(data);
          setSelectedSensor(null)
        }
      }).catch((err) => {
        console.log(err)
      })
  };

  const getSensorsDataList = (sensorId: string) => {
    fetch(`${process.env.REACT_APP_BASE_URL}/sensorData/${sensorId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setSensorDataList(data);
      }).catch((err) => {
        console.log(err)
      })
  };
  // ______________________

  const newSensorData = () => {
    fetch(`${process.env.REACT_APP_BASE_URL}/sensorData`, {
      method: 'POST',
      body: JSON.stringify({ valor: valorInput, data: dataInput, sensorId: sensorInput?._id, assetId: ativoInput?._id }),
      headers: { "Content-type": "application/json; charset=UTF-8" }
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        handleValorInputChange('');
        handleDataInputChange('');
        setAtivoInput(null);
        setSensorInput(null);
        setInputSensorsList([]);
        if (selectedSensor) {
          getSensorsDataList(selectedSensor._id);
          getSensorDataChartOption(selectedSensor._id);
        } else {
          if (selectedAtivo) {
            getSensorsChartOption(selectedAtivo._id)
          } else {
            getAssetsChartOption();
          }
        }
      }).catch((err) => {
        console.log(err)
      })
  }

  const deleteSensorData = (e: any, id: string) => {
    fetch(`${process.env.REACT_APP_BASE_URL}/sensorData/${id}`, { method: 'DELETE' })
      .then((res) => res)
      .then((data) => {
        console.log(data);
        if (selectedSensor) {
          getSensorsDataList(selectedSensor._id);
          getSensorDataChartOption(selectedSensor._id);
        }
      }).catch((err) => {
        console.log(err)
      })
  }

  // Chart
  const getAssetsChartOption = () => {
    fetch(`${process.env.REACT_APP_BASE_URL}/getAssetsChart`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setChartOption(data.option);
      }).catch((err) => {
        console.log(err)
      })
  };

  const getSensorsChartOption = (assetId: string) => {
    fetch(`${process.env.REACT_APP_BASE_URL}/getSensorsChart/${assetId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setChartOption(data.option);
      }).catch((err) => {
        console.log(err)
      })
  };

  const getSensorDataChartOption = (sensorId: string) => {
    fetch(`${process.env.REACT_APP_BASE_URL}/getSensorDataChart/${sensorId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setChartOption(data.option);
      }).catch((err) => {
        console.log(err)
      })
  };
  // -----------------------------------


  const filteredItensList = sensorDataList.filter(function (el) {
    return String(el.valor).includes(filtroInput);
  });

  return (
    <div style={{ padding: '25px 15px' }}>
      <Container>
        <Row style={{ paddingBottom: 25 }}>
          <Col $sm={12} $md={12} $lg={12}>
            <Card>
              <Row>
                <Col $sm={12} $md={12} $lg={12}>
                  <Row>
                    <Col $sm={12} $md={3} $lg={3} style={{ paddingBottom: 20 }}>
                      <InputComponent type='number' height={42} width={250} label="Valor" value={valorInput} onValueChange={handleValorInputChange} />
                    </Col>
                    <Col $sm={12} $md={2} $lg={1} />
                    <Col $sm={12} $md={3} $lg={3} style={{ paddingBottom: 20 }}>
                      <InputComponent type='date' height={42} width={250} label="Data" value={dataInput} onValueChange={handleDataInputChange} />
                    </Col>
                  </Row>
                </Col>
                <Col $sm={12} $md={12} $lg={12}>
                  <Row>
                    <Col $sm={12} $md={3} $lg={3} style={{ paddingBottom: 20 }}>
                      <Select
                        value={ativoInput}
                        onChange={
                          (value) => {
                            if (value?._id) {
                              setAtivoInput(value);
                              getSensorsList(value._id, true)
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
                    <Col $sm={12} $md={2} $lg={1} />
                    {inputSensorsList.length > 0 ?
                      (
                        <Col $sm={12} $md={3} $lg={3} style={{ paddingBottom: 20 }}>
                          <Select
                            value={sensorInput}
                            onChange={
                              (value) => {
                                if (value?._id) {
                                  setSensorInput(value)
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
                            options={inputSensorsList}
                            placeholder="Sensor"
                            getOptionLabel={(option) => option.nome}
                            getOptionValue={(option) => option._id}
                          />
                        </Col>
                      ) : (<></>)
                    }
                  </Row>
                </Col>
                <Col $sm={12} $md={12} $lg={12}>
                  <ButtonComponent onClickAction={newSensorData} label='Adicionar Coleta' color='#FA6E2D' isDisabled={valorInput === '' || dataInput === '' || ativoInput === null || sensorInput === null} />
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
                          getSensorsList(value._id, false);
                          getSensorsChartOption(value._id)
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
                <Col $sm={12} $md={1} $lg={1} />
                {sensorsList.length > 0 ?
                  (
                    <Col $sm={12} $md={3} $lg={3} style={{ paddingBottom: 20 }}>
                      <Select
                        value={selectedSensor}
                        onChange={
                          (value) => {
                            if (value?._id) {
                              setSelectedSensor(value)
                              getSensorsDataList(value._id);
                              getSensorDataChartOption(value._id);
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
                        options={sensorsList}
                        placeholder="Sensor"
                        getOptionLabel={(option) => option.nome}
                        getOptionValue={(option) => option._id}
                      />
                    </Col>
                  ) : (<></>)
                }
              </Row>
            </Card>
          </Col>
        </Row>
        {chartOption === null ?
          (<></>) : (
            <Row style={{ paddingBottom: 30 }}>
              <Col $sm={12} $md={12} $lg={12}>
                <ChartCard>
                  <ReactEcharts option={chartOption} />
                </ChartCard>
              </Col>
            </Row>
          )
        }
        {sensorDataList.length > 0 ?
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
                                      <span style={{ fontWeight: 'bolder' }}>Valor: </span>
                                      <span>{element.valor}</span>
                                    </p>
                                  </Col>
                                  <Col $sm={12} $md={12} $lg={12}>
                                    <p style={{ margin: 0, fontSize: '15px', padding: '4px', color: '#716f6f' }}>
                                      <span style={{ fontWeight: 'bolder' }}>Data: </span>
                                      <span>{element.data}</span>
                                    </p>
                                  </Col>
                                </Col>
                                <Col style={{ paddingTop: 16, paddingBottom: 10 }} $sm={12} $md={3} $lg={2}>
                                  <ButtonComponent onClickAction={(e: any) => deleteSensorData(e, element._id)} label='Deletar' color='red' isDisabled={false} />
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

export default SensoresPage;
