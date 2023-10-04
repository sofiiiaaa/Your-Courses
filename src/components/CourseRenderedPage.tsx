import VerticalNavbar from "./layout/VerticalNavbar";
import StickyHomeButton from "./layout/StickyHomeButton";

import React, {useEffect, useState} from "react";
import {Breadcrumb, Col, Container, Row, Spinner} from "react-bootstrap";
import {Course, Topic} from "../App";
import ReactMarkdown from "react-markdown";

import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

import remarkToc from 'remark-toc';
import remarkSlug from "remark-slug";

import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {atomDark} from 'react-syntax-highlighter/dist/esm/styles/prism';
import {CodeComponent} from "react-markdown/lib/ast-to-react";
import {Link} from "react-router-dom";


interface SingleRenderedCoursePageProps {
    course: Course | Topic;
    categoryName: string;
    courseName?: string;
}

function cleanMarkdown(markdown: string): string {
    return (
        markdown
            .replace(/<!-- toc -->/g, "")
            .replace(/\\pagebreak/g, "")
            .replace(/\\newpage/g, "")
            .split(/<!-- tocstop -->/g)[1]
            .replaceAll("end-toc", "")
            .replace(/<!--.*?-->/g, "")
            .replace(/<--.*? -->/g, "")
            .trim()
    )
}


function getToc(markdown: string): string {
    const tocStart = markdown.indexOf('<!-- toc -->') + '<!-- toc -->'.length;
    const tocEnd = markdown.indexOf('<!-- tocstop -->');
    return markdown.slice(tocStart, tocEnd);
}

const CourseRenderedPage: React.FC<SingleRenderedCoursePageProps> = ({course, categoryName, courseName}) => {
    const [markdown, setMarkdown] = useState("");
    const [loading, setLoading] = useState(true);
    const [toc, setToc] = useState("");

    useEffect(() => {
        fetch(`${process.env.PUBLIC_URL}/${course.file_path}`)
            .then(response => response.text())
            .then(text => {
                setToc(getToc(text));
                setMarkdown(cleanMarkdown(text));
            })
            .then(() => setLoading(false))
            .catch((error) => alert(
                `Error loading markdown: \n ${process.env.PUBLIC_URL}${course.file_path} \n ${categoryName} - ${courseName} - ${course.name} \n ${error}`
            ));
    }, [course.file_path]);


    const CodeBlock: CodeComponent = ({node, inline, className, children, ...props}) => {
        const match = /language-(\w+)/.exec(className || '')
        return !inline && match ? (
            <SyntaxHighlighter
                // @ts-ignore
                style={atomDark}
                language={match[1]}
                PreTag="div"
                showLineNumbers
                customStyle={{textDecoration: "none!important"}}
                children={String(children).replace(/\n$/, '')} {...props}
            />
        ) : (
            <code className={className} {...props}>
                {children}
            </code>
        )
    }

    return (
        <Container className="main-container">
            <Row>
                <Breadcrumb>
                    <Breadcrumb.Item linkAs={Link} linkProps={{to: "/"}}>Home</Breadcrumb.Item>
                    <Breadcrumb.Item linkAs={Link} linkProps={{to: `/${categoryName}`}}>{categoryName}</Breadcrumb.Item>
                    {courseName &&
                        <Breadcrumb.Item linkAs={Link} linkProps={{to: `/${categoryName}/${courseName}`}}>
                            {courseName}
                        </Breadcrumb.Item>
                    }
                    <Breadcrumb.Item active>{course.name}</Breadcrumb.Item>
                </Breadcrumb>
                <Col className="title-header" xs='12'>
                    <h4 className={"main-title"}>{course.name}</h4>
                    <hr/>
                </Col>
                <Col xs={12}>
                    <div className="upfront-image-div">
                        <img src={`${process.env.PUBLIC_URL}/${course.image}`} alt={course.name}
                             className="upfront-image"/>
                    </div>
                </Col>
                <hr/>

                {loading ?
                    <Row className="align-items-center justify-content-center">
                        <Col xs="12" className="spinner-col">
                            <Spinner
                                animation="grow"
                                variant="info"
                                className="spinner-element"
                            />
                        </Col>
                    </Row>
                    :
                    <Col xs="12" style={{paddingBottom: "20px"}}>
                        <VerticalNavbar rawToc={toc}/>
                        <StickyHomeButton/>
                        <ReactMarkdown
                            children={markdown}
                            className="markdown-content"
                            components={{
                                code: CodeBlock,
                            }}
                            transformImageUri={
                                (uri) => uri.startsWith('http') ? uri : `${process.env.PUBLIC_URL}/${course.file_path.split("/").slice(0, -1).join("/")}/${uri}`}
                            // @ts-ignore
                            rehypePlugins={[rehypeKatex]}
                            remarkPlugins={[
                                remarkGfm,
                                remarkMath,
                                remarkSlug
                            ]}

                        />
                    </Col>}
            </Row>
        </Container>
    );
};

export default CourseRenderedPage;
