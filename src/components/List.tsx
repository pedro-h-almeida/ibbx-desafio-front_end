import { useState } from "react";
import InputComponent from "./Input";
import { Col, Row } from "./Grid";
import styled from "styled-components";

const Card = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 10px;
  border: 1px solid #e9e9e9;
  display: flex;
`;

const CardHeader = styled.div`
  font-size: 18px;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bolder;
  padding-bottom: 8px
`;

const Divider = styled.hr`
  border-top: 1px solid #e9e9e9;
`;

type itensList = {
  _id: string;
  nome: string;
};

type MyProps = {
  filter: keyof itensList;
  itensList: itensList[];
};

function ListComponent({ filter, itensList }: MyProps) {

  const [value, setValue] = useState('');

  console.log(filter);


  const onValueChange = (text: string) => {
    setValue(text);
  }

  const filteredItensList = itensList.filter(function (el) {
    return el[filter].toUpperCase().includes(value.toUpperCase());
  });


  const ListItem = () => (
    <>
      {filteredItensList.map((element, index) => (
        <Row key={element._id}>
          <Col $sm={12} $md={12} $lg={12}>
            <div style={{fontWeight: 'bolder'}}>ID: </div><div>{element._id}</div>
          </Col>
          <Col $sm={12} $md={12} $lg={12}>
            <div>{element.nome}</div>
          </Col>
        </Row>
      ))}
    </>
  );


  return (
    <div>
      <Row>
        <Col $sm={12} $md={3} $lg={2}>
          <InputComponent height={30} width={250} label="Filtro" value={value} onValueChange={onValueChange} />
        </Col>
      </Row>
      <Row style={{ paddingTop: '15px' }}>
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
    </div>
  );
}

export default ListComponent;