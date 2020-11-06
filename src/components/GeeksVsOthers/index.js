import React, {useState} from 'react';
import styled from 'styled-components';
import {useStaticQuery, graphql} from 'gatsby';
import {Row, Container, Column, Divider, Div} from '../Sections'
import {H3, H4, H5, Title, Paragraph} from '../Heading';
import {Colors, Button, Tooltip, Span} from '../Styling';
import Card from '../Card';
import Icon from '../Icon';
import Link from 'gatsby-link'
import Fragment from "../Fragment"

const Globe = styled.div`
opacity: 1;
background: #e6ba1f;
width: 80px;
min-height: 50px;
padding: 5px;
font-family: "Lato, sans-serif";

position: absolute;
border-radius: 10px;
bottom: 40px;
z-index: 100;
left: 0px;
box-shadow: 4px 4px 8px 4px rgba(0, 0, 0, 0.2);
display: flex;
flex-direction: column;
justify-content: center;
text-align: center;
&:before {
  content: "";
  position: absolute;
  z-index: 99;
  left: 15px;
  top: 50px;
  transform: rotate(-45deg);
  width: 0;
  height: 0;
  border-top: 1px solid transparent;
  border-right: 35px solid #e6ba1f;
  border-bottom: 13px solid transparent;
  // box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}
opacity: 0.1;  
animation: blink-animation 2s steps(15, start) infinite;
  @keyframes blink-animation {
    to {
      opacity: 1;
    }
  }
`

const GeeksVsOthers = props => {
  const data = useStaticQuery(graphql`
  query GeeksVsOthersQuery{
    allGeeksVsOthersYaml{
      edges {
        node {
          fields{
            lang
          }
          info {
            features
            at4_Geeks
            industry_average
            why_important
            icon
          }
          globe_text
          titles{
            featured
            at_geeks
            average
          }

          button{
            button_text
            button_link
          }
        }
      }
    }
  }
    `)
  const [tooltip, setTooltip] = useState(false);
  const [openedIndex, setOpenedIndex] = useState(null)
  const [tooltipOpacity, setTooltipOpacity] = useState(0)
  const [tooltipIndex, setTooltipIndex] = useState()

  const [globeTooltip, setGlobeTooltip] = useState(true)

  let geeks = data.allGeeksVsOthersYaml.edges.find(({node}) => node.fields.lang === props.lang);
  if (geeks) geeks = geeks.node;

  return (
    <Fragment github="/components/geeks_vs_others">
      <Row display={`flex`}>
        <Column
          size="12"
          borderRadius="0 0 0 1.25rem"
          image="no"
          background={Colors.white}
        >
          <Card shadow borders="1.25rem" overflow="hidden">
            <Row height="80px" marginLeft="0" marginRight="0" display={`flex`}>
              <Column size="6" alignSelf="center" height="100%" image="no" background={Colors.black} borderRadius="1.25rem 0 0 0" >
                <Row display={`flex`} height="100%" style={{borderBottom: `1px solid ${Colors.darkGray}`}} alignItems="center">
                  <H5 fontSize="12px" align="center" color={Colors.gray}>{geeks.titles.featured}</H5>
                </Row>
              </Column>
              <Column size="3" alignSelf="center" height="100%" image="no" background={Colors.lightGray}>
                <Row display={`flex`} height="100%" style={{borderBottom: `1px solid ${Colors.borderGray}`}} alignItems="center">
                  <H5 fontSize="12px" align="center" color={Colors.gray}>{geeks.titles.at_geeks}</H5>
                </Row>
              </Column>
              <Column size="3" alignSelf="center" height="100%" image="no" background={Colors.white} border="custom" borderRadius="0 1.25rem 0  0">
                <Row display={`flex`} height="100%" style={{borderBottom: `1px solid ${Colors.borderGray}`}} alignItems="center">
                  <H5 fontSize="12px" align="center" color={Colors.gray}>{geeks.titles.average}</H5>
                </Row>
              </Column>
            </Row>
            {geeks.info.slice(0, props.limit || geeks.info.length).map((item, index) => {
              return (
                <div key={index}>
                  {openedIndex === index ? <div
                    onClick={() => setOpenedIndex(openedIndex === index ? null : index)}
                    style={{border: '1px solid', fontSize: "20px", fontFamily: "Lato, sans-serif", minHeight: "80px", textAlign: "center", padding: "20px"}}
                  >
                    <H4>{item.features}</H4>
                    {item.why_important}
                  </div>
                    :
                    <Row
                      key={index}
                      display={`flex`}
                      height="80px"
                      marginLeft="0" marginRight="0"
                      className="pointer"
                      onClick={() => {setGlobeTooltip(false); setOpenedIndex(openedIndex === index ? null : index);}}
                    >
                      <Column size="6" alignSelf="center" height="100%" image="no" background={Colors.black}>
                        <Row display={`flex`} justifyContent="around" height="100%" style={{borderBottom: `1px solid ${Colors.darkGray}`}}>
                          <Div display={`flex`} flexDirection={`column`} justifyContent={`center`} >
                            <Div display={`flex`} alignItems={`center`} padding="10px">
                              {item.icon && <Icon icon={item.icon} width="32" style={{marginRight: "5px"}} color={Colors.yellow} fill={Colors.yellow} />}
                              <H4
                                fontSize="24px"
                                fs_xs="16px"
                                fs_sm="16px"
                                fs_md="16px"
                                fs_lg="18px"
                                color={Colors.white}
                              >
                                {item.features}
                              </H4>
                              <Div display={`flex`} position={`relative`}>
                                {tooltip === true && index === tooltipIndex &&
                                  <Tooltip className="d-sm-none" opacity={tooltipOpacity}>
                                    <Paragraph align="center"
                                      fs_xs="16px"
                                      fs_sm="16px"
                                      fs_md="16px"
                                      fs_lg="16px"
                                      fs_xl="16px"
                                      color={Colors.white}
                                    >
                                      {item.why_important}
                                    </Paragraph>
                                  </Tooltip>
                                }
                                {globeTooltip === true && index === 0 &&
                                  <Globe>
                                    <Paragraph align="center"
                                      fs_xs="16px"
                                      fs_sm="16px"
                                      fs_md="16px"
                                      fs_lg="16px"
                                      fs_xl="16px"
                                      color={Colors.black}
                                    >
                                      {geeks.globe_text}
                                    </Paragraph>
                                  </Globe>}
                                <span
                                  onMouseOver={() => {setTooltip(!tooltip), setTooltipIndex(index), setTooltipOpacity(1), setGlobeTooltip(false)}}
                                  onMouseOut={() => {setTooltip(!tooltip), setTooltipIndex(null), setTooltipOpacity(0), setGlobeTooltip(false)}}
                                  onClick={() => {setTooltip(!tooltip), setTooltipIndex(index), setTooltipOpacity(0), setGlobeTooltip(false)}}
                                >
                                  <Icon icon="question" className="pointer" width="20" color={Colors.lightBlue} fill={Colors.lightBlue} />
                                </span>
                              </Div>
                            </Div>
                          </Div>
                        </Row>
                      </Column>
                      <Column size="3" width="100%" height="100%" alignSelf="center" image="no" background={Colors.lightGray}>
                        <Row display={`flex`} height="100%" style={{borderBottom: `1px solid ${Colors.borderGray}`}} alignItems="center">
                          <H4
                            align="center"
                            fontSize="20px"
                            fs_sm="14px"
                            fs_md="18px"
                            fs_lg="18px"
                            color={Colors.gray}>{item.at4_Geeks}
                          </H4>
                        </Row>
                      </Column>
                      <Column size="3" width="100%" height="100%" alignSelf="center">
                        <Row display={`flex`} height="100%" style={{borderBottom: `1px solid ${Colors.borderGray}`}} alignItems="center">
                          <H4 align="center"
                            fontSize="20px"
                            fs_sm="14px"
                            fs_md="18px"
                            fs_lg="18px"
                            color={Colors.gray}>{item.industry_average}
                          </H4>
                        </Row>
                      </Column>
                    </Row>
                  }
                </div>
              )
            }
            )}
          </Card>
        </Column>
      </Row>
      {props.limit &&
        <Row justifyContent="center" display={`flex`}>
          <Link to={geeks.button.button_link}>
            <Button width="300px" color={Colors.blue} textColor={Colors.white} margin="2rem 0" padding=".85rem">{geeks.button.button_text}</Button>
          </Link>
        </Row>
      }
    </Fragment>
  )
};

export default GeeksVsOthers;

