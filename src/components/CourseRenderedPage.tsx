import VerticalNavbar from "./layout/VerticalNavbar";

import React, {useState, useEffect} from "react";
import {Container, Col, Row, Spinner} from "react-bootstrap";
import {Course} from "../App";

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


interface SingleRenderedCoursePageProps {
    course: Course;
}

function cleanMarkdown(markdown: string): string {
    return (
        markdown
            .replace(/<!-- toc -->/g, "")
            .replace(/<!-- tocstop -->/g, "---")
            .replace(/\\pagebreak/g, "")
            .replace(/\\newpage/g, "")
            .replace(/<!--.*?-->/g, "")
    )
}


function getToc(markdown: string): string {
    const tocStart = markdown.indexOf('<!-- toc -->') + '<!-- toc -->'.length;
    const tocEnd = markdown.indexOf('<!-- tocstop -->');
    return markdown.slice(tocStart, tocEnd);
}

const CourseRenderedPage: React.FC<SingleRenderedCoursePageProps> = ({course}) => {
    const [markdown, setMarkdown] = useState("");
    const [loading, setLoading] = useState(true);
    const [toc, setToc] = useState("");

    useEffect(() => {
        fetch(course.file_path)
            .then(response => response.text())
            .then(text => {
                setToc(getToc(text));
                setMarkdown(cleanMarkdown(text));
            })
            .then(() => setLoading(false))
            .catch((error) => console.error(error));
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
                <Col className="title-header" xs='12'>
                    <h4>{course.name}</h4>
                    <hr/>
                </Col>
                <Col xs={12}>
                    <div className="upfront-image-div">
                        <img src={"/" + course.image} alt={course.name} className="upfront-image"/>
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
                        <ReactMarkdown
                            children={markdown}
                            className="markdown-content"
                            components={{
                                code: CodeBlock,
                            }}
                            transformImageUri={
                                (uri) => uri.startsWith('http') ? uri : `${course.file_path.split("/").slice(0, -1).join("/")}/${uri}`}
                            // @ts-ignore
                            rehypePlugins={[rehypeKatex]}
                            remarkPlugins={[
                                [remarkToc, {maxDepth: 1, prefix: 'toc', tight: true, ordered: true}],
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
