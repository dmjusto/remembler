import React from 'react';
import { Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import './Landing.css';

const Landing = () => {
    const useStyles = makeStyles((theme) => ({
        root: {
            '& > *': {
                margin: theme.spacing(1),
            },
        },
    }));

    const classes = useStyles();

    return (
        <section className='Landing'>
            <Container>
                <div className='landing-content'>
                    <h1>Remembler</h1>
                    <h3>Create and Share Flashcard Decks</h3>
                    <div className={classes.root}>
                        <Button variant='contained' color='primary'>
                            <Link className='action-links' to='/register'>
                                Register
                            </Link>
                        </Button>
                        <Button variant='contained' color='secondary'>
                            <Link className='action-links' to='/login'>
                                login
                            </Link>
                        </Button>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default Landing;
