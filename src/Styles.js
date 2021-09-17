import { createTheme, makeStyles } from "@material-ui/core";

export const theme = createTheme({
        overrides:{
            CheckBox : {
                color: 'green'
            },    
        }
});

export const useStyles = makeStyles({
    formIcons:{
        display: 'flex',
        alignItems: 'center'
    },
    loadingIcon: {
        display:"flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh"
    },
    container: {
        maxWidth: '500px',
        margin: '30px auto',
        overflow: 'auto',
        minHeight: '300px',
        border: '1px solid steelblue',
        padding: '30px',
        borderRadius: '5px'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px'
    },
    btn: {
        display: 'inline-block',
        background: '#000',
        color: '#fff',
        border: 'none',
        padding: '10px 20px',
        margin: '5px',
        borderRadius: '5px',
        cursor: 'pointer',
        textDecoration: 'none',
        fontSize: '15px',
        fontFamily: 'inherit',
    },
    btnBlock: {
        display: 'block',
        width: '100%'
    }
    
})