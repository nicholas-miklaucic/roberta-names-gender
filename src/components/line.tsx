import React from 'react';
import { Line } from '@ant-design/plots'
import { EuiFlexGrid, EuiFlexGroup, EuiFlexItem, EuiPanel, useEuiFontSize, useEuiTheme } from '@elastic/eui';
import { css } from '@emotion/react';
import lightTheme from './g2light.json'
import darkTheme from './g2dark.json'

export default function LinePlot({ data, currName }) {
    const currPoint = data.filter((datum) => datum['name'] === currName);
    const { euiTheme, colorMode } = useEuiTheme();
    const fs = useEuiFontSize('xl').fontSize;
    return (
        <EuiPanel css={css`
                    width: 100%;
                    height: 100%;
                `}>
            <Line
                data={currPoint}
                xField='year'
                yField='babies'
                seriesField='sex'
                renderer='svg'
                padding='auto'
                lineStyle={{
                    lineWidth: 2.5
                }}
                legend={{
                    position: 'top'
                }}
                xAxis={{
                    title: {
                        text: "Year"
                    },
                    grid: null
                }}
                yAxis={{
                    title: {
                        text: 'Babies'
                    },
                }}
                theme={colorMode === 'DARK' ? darkTheme : lightTheme}
            />
        </EuiPanel>
    )
}
