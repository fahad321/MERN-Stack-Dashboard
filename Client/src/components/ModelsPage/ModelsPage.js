import React, { Component } from 'react'
import ModelCard from './ModelCard'
import MultilineChartIcon from '@material-ui/icons/MultilineChart'
import models from './Models.png'

// export default class ModelsPage extends Component {
//     render() {
//         return (
//             <div>
//                 <ModelCard heading="model1" status="n" />
//                 <ModelCard heading="model2" status="u" />
//                 <ModelCard heading="model3" status="u" />
//                 <ModelCard heading="model3" status="n" />
//                 <ModelCard heading="model5" status="u" />
//             </div>
//         )
//     }
// }

import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(6),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}))

export default function ModelsPage() {
    const classes = useStyles()

    return (
        <div>
            <img src={models} style={{ height: '800px', width: '1200px' }} />
        </div>
    )
}
