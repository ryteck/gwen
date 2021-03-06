import styled from 'styled-components'

const Style = styled.div`

width: 100vw;
height: 100vh;
display: flex;
align-items: center;
justify-content: space-between;

* {
    color: var(--color-background-light);
}

main {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    .storeMenu {
        margin: 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        grid-gap: 20px;

        input {
            text-align: center;
            height: 40px;
            border-radius: 20px;
            border: solid 2px;
            outline: none;
            transition: 0.25s;
            width: 100px;
        }

        input.active {
            border-color: var(--color-secondary-pure);
            box-shadow: 0 0 100px var(--color-secondary-pure);
            background-color: var(--color-secondary-pure);
        }

        input.desactive {
            background: none;
            border-color: var(--color-secondary-dark);
            box-shadow: 0 0 2px var(--color-secondary-dark);
            cursor: pointer;

            :hover {
                border-color: var(--color-secondary-pure);
                box-shadow: 0 0 100px var(--color-secondary-pure);
                background-color: var(--color-secondary-pure);
            }
        }
    }

    .storeContent {
        width: 100%;
        height: 100%;
        display: grid;
        align-items: center;
        justify-content: center;
        overflow: auto;

        * {
            color: #000000;
        }
    }
}

`

export default Style
