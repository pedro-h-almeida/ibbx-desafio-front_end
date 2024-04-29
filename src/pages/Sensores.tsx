import { useEffect, useState } from 'react';
import styled from 'styled-components';
import ButtonComponent from '../components/Button';
import { Row, Col, Container } from '../components/Grid';
import InputComponent from '../components/Input';
import Select from 'react-select'
import ReactEcharts from "echarts-for-react";

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

const Card = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 10px;
  border: 1px solid #e9e9e9;
  display: flex;
  height: 100%;
`;

const ChartCard = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 10px;
  border: 1px solid #e9e9e9;
  height: 100%;
`;

const Divider = styled.hr`
  border-top: 1px solid #e9e9e9;
`;


function SensoresPage() {

  const [valor, setValor] = useState('');
  const [data, setData] = useState('');
  const [asset, setAsset] = useState<assetsListType | null>(null);
  const [sensor, setSensor] = useState<sensorsListType | null>(null);
  const [newSensorsList, setNewSensorsList] = useState<sensorsListType[]>([]);
  const [filtro, setFiltro] = useState('');
  const [chartOption, setChartOption] = useState<ChartOption | null>(null);
  const [selectedAsset, setSelectedAsset] = useState<assetsListType | null>();
  const [selectedSensor, setSelectedSensor] = useState<sensorsListType | null>();
  const [assetsList, setAssetsList] = useState<assetsListType[]>([]);
  const [sensorsList, setSensorsList] = useState<sensorsListType[]>([]);
  const [sensorDataList, setSensorDataList] = useState<sensorDataListType[]>([]);


  useEffect(() => {
    getAssetsList();
    getAssetsChartOption();
  }, []);

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
          setNewSensorsList(data)
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

  // GET CHARTS DATA

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

  const changeValorValue = (text: string) => {
    setValor(text);
  }

  const changeDataValue = (text: string) => {
    setData(text);
  }

  const changeFiltroValue = (text: string) => {
    setFiltro(text);
  }

  const newSensorData = () => {
    fetch(`${process.env.REACT_APP_BASE_URL}/sensorData`, {
      method: 'POST',
      body: JSON.stringify({ valor, data, sensorId: sensor?._id, assetId: asset?._id }),
      headers: { "Content-type": "application/json; charset=UTF-8" }
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setValor('');
        setData('');
        setAsset(null);
        setSensor(null);
        setNewSensorsList([]);
        if (selectedSensor) {
          getSensorsDataList(selectedSensor._id);
          getSensorDataChartOption(selectedSensor._id);
        } else {
          if(selectedAsset){
            getSensorsChartOption(selectedAsset._id)
          }else{
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


  const filteredItensList = sensorDataList.filter(function (el) {
    return String(el.valor).includes(filtro);
  });

  const ListItem = () => (
    <Container>
      {filteredItensList.map((element) => (
        <div key={element._id} >
          <Row style={{ marginTop: '12px', marginBottom: '12px' }}>
            <Col $sm={12} $md={10} $lg={10}>
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
            <Col style={{ paddingTop: 16, paddingBottom: 10 }} $sm={12} $md={2} $lg={2}>
              <ButtonComponent onClickAction={(e: any) => deleteSensorData(e, element._id)} label='Deletar' color='red' isDisabled={false} />
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
                <Col $sm={12} $md={12} $lg={12}>
                  <Row>
                    <Col $sm={12} $md={3} $lg={3} style={{ paddingBottom: 20 }}>
                      <InputComponent type='number' height={42} width={250} label="Valor" value={valor} onValueChange={changeValorValue} />
                    </Col>
                    <Col $sm={12} $md={2} $lg={1} />
                    <Col $sm={12} $md={3} $lg={3} style={{ paddingBottom: 20 }}>
                      <InputComponent type='date' height={42} width={250} label="Data" value={data} onValueChange={changeDataValue} />
                    </Col>
                  </Row>
                </Col>
                <Col $sm={12} $md={12} $lg={12}>
                  <Row>
                    <Col $sm={12} $md={3} $lg={3} style={{ paddingBottom: 20 }}>
                      <Select
                        value={asset}
                        onChange={
                          (value) => {
                            if (value?._id) {
                              setAsset(value);
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
                    {newSensorsList.length > 0 ?
                      (
                        <Col $sm={12} $md={3} $lg={3} style={{ paddingBottom: 20 }}>
                          <Select
                            value={sensor}
                            onChange={
                              (value) => {
                                if (value?._id) {
                                  setSensor(value)
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
                            options={newSensorsList}
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
                  <ButtonComponent onClickAction={newSensorData} label='Adicionar Coleta' color='#FA6E2D' isDisabled={valor === '' || data === '' || asset === null || sensor === null} />
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
                          setSelectedAsset(value)
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

export default SensoresPage;
