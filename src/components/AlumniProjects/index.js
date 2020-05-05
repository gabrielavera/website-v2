import React, {useState, useEffect} from 'react';
import {useStaticQuery, graphql} from 'gatsby';
import {Row, Container, Column, Divider} from '../Sections'
import {H1, H2, H3, H4, H5, Title, Separator, Span, Paragraph} from '../Heading';
import {Colors, Address, Teacher, Glasses, Clock, Users, Comments, Button, RoundImage} from '../Styling';
import {Card} from '../Card';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from 'react-responsive-carousel';
import {Link} from 'gatsby';

const AlumniProjects = props => {
    const [slideIndex, setSlideIndex] = useState()
    const data = useStaticQuery(graphql`
      query myQueryAlumni{
        allAlumniProjectsYaml {
            edges {
              node {
                header{
                  tagline
                  sub_heading
                  button_text
                }
                projects {
                    project_name
                    slug
                    image
                    image_alt
                    project_content
                    project_video
                    github_repo
                    alumni {
                      first_name
                      last_name
                      job_title
                      github
                      linkedin
                      twitter
                    }
                  }
                button_section{
                  button_text
                  button_link
                }
              }
            }
          }
        }
      `)
    let alumniData = data.allAlumniProjectsYaml.edges[0].node
    console.log("alumni###", alumniData)
    return (
        <>
            <Row>
                <Column
                    size="12"
                    border="bottom"
                    image="no"
                    color={Colors.white}
                >
                    <Carousel
                        showIndicators={false}
                        showThumbs={false}
                        selectedItem={slideIndex}
                        showStatus={false}
                        autoPlay={false}
                        infiniteLoop={true}
                        showArrows={false}
                    >
                        {alumniData != null &&
                            alumniData.projects.map((item, index) => {
                                console.log("$%$%", item)
                                return (
                                    <Card key={index} shadow borders="1.25rem" height="500px">
                                        <Row
                                            height="100%"
                                            marginLeft="0"
                                            marginRight="0"
                                            customRespSize
                                        >
                                            <Column size="6" customRespSize respSize="6" alignSelf="center" height="100%" image="no" border="bottom">
                                                <Row align="center" height="100%">
                                                    <Column size="9" height="100%">
                                                        <Divider height="10%" />
                                                        <Row height="30%">
                                                            <Column size="12" customRespSize respSize="12">
                                                                <H3 primary color={Colors.blue} align="left" >{`Meet  `}</H3>
                                                                {item.alumni.map((alumni, i) => {
                                                                    return (
                                                                        <>
                                                                            <Row key={i} >
                                                                                <Column size="12">
                                                                                    <H4
                                                                                        fs_xs="12px"
                                                                                        fs_sm="13px"
                                                                                        fs_md="14px"
                                                                                        fs_lg="16px"
                                                                                        fs_xl="16px"
                                                                                        primary align_xs="center" align="left">{`${alumni.first_name} ${alumni.last_name}`}
                                                                                    </H4>
                                                                                </Column>
                                                                            </Row>
                                                                            <Row marginBottom="5px">
                                                                                <Column size="12" alignSm="center">
                                                                                    <Paragraph
                                                                                        primary
                                                                                        fs_xs="10px"
                                                                                        fs_sm="11px"
                                                                                        fs_md="11px"
                                                                                        fs_lg="11px"
                                                                                        fs_xl="11px"
                                                                                        lineHeight="24px"
                                                                                        // margin="5px 0"
                                                                                        align="left" >{`${alumni.job_title}`}
                                                                                    </Paragraph>
                                                                                </Column>
                                                                            </Row>
                                                                        </>
                                                                    )
                                                                })}
                                                            </Column>
                                                        </Row>
                                                        <Row height="5%" >
                                                            <Separator primary al_xs="center" />
                                                        </Row>
                                                        <Row height="10%">
                                                            <Column size="12">
                                                                <Row height="100%" align="left">
                                                                    <Column size="10" customRespSize respSize="10" alignSelf="center">
                                                                        <H4 color={Colors.gray} align="left" fs_xs="14px"
                                                                            fs_sm="14px"
                                                                            fs_md="16px"
                                                                            fs_lg="16px"
                                                                            fs_xl="16px" lineHeight="20px">{`${item.project_name}`}</H4>
                                                                    </Column>
                                                                </Row>
                                                            </Column>
                                                        </Row>
                                                        <Row height="35%">
                                                            <Column size="12">
                                                                <Paragraph
                                                                    fs_xs="10px"
                                                                    fs_sm="11px"
                                                                    fs_md="13px"
                                                                    fs_lg="11px"
                                                                    fs_xl="12px" color={Colors.gray} align="left" fontSize="14px" lineHeight="20px">{item.project_content}</Paragraph>
                                                            </Column>
                                                        </Row>
                                                        <Row height="10%">
                                                            <Column size="12">
                                                                {/* <Paragraph color={Colors.blue} align="left" fontSize="14px" lineHeight="20px">{alumni.header.button_text}</Paragraph> */}
                                                            </Column>
                                                        </Row>
                                                    </Column>
                                                </Row>
                                            </Column>
                                            <Column
                                                size="6"
                                                customRespSize
                                                respSize="6"
                                                alignSelf="center"
                                                image="yes"
                                                url={item.image}
                                                backgroundSize="cover"
                                                bg_position="center center"
                                                height="100%"
                                                border="custom"
                                                customBorderRadius="0 1.25rem 1.25rem 0" >
                                            </Column>

                                        </Row>
                                    </Card>
                                )
                            })
                        }
                    </Carousel>
                </Column>
            </Row>
            <Divider height="50px" />
            {props.showThumbs === "true"
                ?
                <Row height="auto" align="center">
                    {alumniData != null &&
                        alumniData.projects.map((project, i) => {
                            return (
                                <Column key={i} size="2" customRespSize respSize="2" padding="0 25px" onClick={() => setSlideIndex(i)}>
                                    <RoundImage
                                        h_xs="40px"
                                        h_sm="70px"
                                        h_md="60px"
                                        h_lg="80px"
                                        h_xl="90px"
                                        width="100%"
                                        br_xs=".25rem"
                                        br_sm=".25rem"
                                        br_md=".25rem"
                                        br_lg=".25rem"
                                        br_xl=".25rem"
                                        url={project.image}
                                        border=".75rem"
                                        bsize="cover"
                                        position="center"
                                        height="100%"
                                        // width="auto"
                                        mb="1.25rem">
                                        <Row height="100%" align="around">
                                            <Column size="12" alignSelf="center" align="center">
                                                <H4
                                                    color={Colors.white}
                                                    fs_xs="9px"
                                                    fs_sm="12px"
                                                    fs_md="12px"
                                                    fs_lg="14px"
                                                    fs_xl="16px"
                                                >
                                                    {project.project_name}
                                                </H4>
                                            </Column>
                                        </Row>

                                    </RoundImage>
                                </Column>
                            )
                        })}
                </Row>
                : props.showThumbs === "false" &&
                <Row height="10%" align="center">
                    <Column size="6" align="center">
                        <Link to={alumniData.button_section.button_link}>
                            <Button outline width="200px" color={Colors.gray} textColor={Colors.black} margin="2rem 0" padding=".35rem.85rem">{alumniData.button_section.button_text}</Button>
                        </Link>
                    </Column>
                </Row>
            }
        </>)
};
export default AlumniProjects;