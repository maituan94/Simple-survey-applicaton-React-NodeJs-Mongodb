import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
    /* Setting the padding for the body of the document. */
    body: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
    },
    /* Setting the style for the date. */
    date: {
        fontSize: 11,
        color: '#aaaaaa',
        fontStyle: 'italic',
        marginBottom: 5
    },
    /* Setting the style for the title of the document. */
    title: {
        fontSize: 20,
        color: '#686868',
        marginBottom: 20,
    },
    /* Setting the style for the label of the question. */
    label: {
        fontSize: 12,
        color: 'grey',
        marginBottom: 5
    },
    /* Setting the style for the answer. */
    answer: {
        padding: 10,
        fontSize: 13,
        color: 'black',
        marginBottom: 20,
        borderColor: '#eeeeee',
        borderWidth: 1,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 5,
    },
    /* Setting the style for the icons. */
    icon: {
        width: 11,
        height: 11,
        marginRight: 3
    },
    /* Setting the direction of the flexbox to row. */
    flexRow: {
        flexDirection: 'row'
    },
    /* Setting the style for the answer of the checkbox and radio questions. */
    checkRadioAns: {
        fontSize: 13,
        color: 'black',
        top: -2
    }
});


/**
 * It takes in a list of questions and renders them as a PDF
 * @param props - The props passed to the component.
 * @returns A React component that renders a PDF.
 */
const AnswerPDF = (props) => {
    /* Destructuring the props object. */
    const { date, title, email, questions } = props

    /**
     * Render answer for checkbox question
     * @param question - The question object
     * @returns 
     */
    const renderCheckBoxAnswers = (question) => {
        /* Checking if the question has options. If it does not, it returns an empty view. */
        if (!question.options) return <></>
        return <>
            {question.options.map((opt) => {
                const isChecked = question.value?.split(';').includes(opt)
                return <View key={`${question.title}-${opt}`} style={styles.flexRow}>
                    {isChecked ? <Image
                        style={styles.icon}
                        src='/assets/icons/checkbox-checked.png'
                    /> : <Image
                        style={styles.icon}
                        src='/assets/icons/checkbox.png'
                    />}
                    <Text style={styles.checkRadioAns}>{opt}</Text>
                </View>
            })}
        </>
    }

    /**
     * Render answer for radio question
     * @param question - The question object
     * @returns 
     */
    const renderRadioAnswer = (question) => {
        /* Checking if the question has options. If it does not, it returns an empty view. */
        if (!question.options) return <></>
        return <>
            {question.options.map((opt) => {
                const isChecked = question.value === opt
                return <View key={`${question.title}-${opt}`} style={styles.flexRow}>
                    {isChecked ? <Image
                        style={styles.icon}
                        src='/assets/icons/radio-checked.png'
                    /> : <Image
                        style={styles.icon}
                        src='/assets/icons/radio.png'
                    />}
                    <Text style={styles.checkRadioAns}>{opt}</Text>
                </View>
            })}
        </>
    }
    /**
     * Render answer for text question
     * @param question - The question object
     * @returns 
     */
    const renderTextAnswer = (question) => <Text>{question.value}</Text>

    /* A map of functions that will be called based on the type of question. */
    const renderType = {
        'checkbox': (question) => renderCheckBoxAnswers(question), // checkbox questions
        'radio': (question) => renderRadioAnswer(question), // radio questions
        'text': (question) => renderTextAnswer(question) // text questions
    }

    return <Document>
        <Page size='A4' style={styles.body}>
            <Text style={styles.date}>{date}</Text>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.label}>Email</Text>
            <View style={styles.answer}>
                <Text>{email}</Text>
            </View>

            {questions.map(q => {
                return <View key={`render-${q.title}`}>
                    <Text style={styles.label}>{q.title}</Text>
                    <View style={styles.answer}>
                        {renderType[q.type](q)}
                    </View>
                </View>
            })}
        </Page>
    </Document>
}

export default AnswerPDF