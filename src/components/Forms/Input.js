import React from "react";
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/styles';


// ! If needed to customize a single Input's style 
// you can create { makeStyles } function inside the Component that uses
// this input, customize styles and send it via props to this Input component

const useStyles = makeStyles({
    root: {
        maxWidth: '400px',
        width: '100%',
    }
})

export const Input = ({ ...props }) => {
    const styles = useStyles()

    return (
        props.styles
            ? <TextField className={props.styles.root} id={props.id}
                type={props.type} label={props.label} variant={props.variant}
                value={props.value} onChange={props.onChange} onFocus={props.onFocus}
                error={props.error} placeholder={props.placeholder} />
            : <TextField className={styles.root} id={props.id}
                type={props.type} label={props.label} variant={props.variant}
                value={props.value} onChange={props.onChange} onFocus={props.onFocus}
                error={props.error} placeholder={props.placeholder} />
    )
}