import React from 'react';
import { Scatter } from '@ant-design/plots'
import { EuiFlexGrid, EuiFlexGroup, EuiFlexItem, EuiPanel, useEuiFontSize, useEuiTheme } from '@elastic/eui';
import { css } from '@emotion/react';
import lightTheme from './g2light.json'
import darkTheme from './g2dark.json'

export default function ScatterPlot({ data, currName }) {
    const currPoint = data.filter((datum) => datum['Name'] === currName);
    const { euiTheme, colorMode } = useEuiTheme();
    const highlightColor = colorMode === 'DARK' ? '#00a0ec' : '#1846b3';
    const fs = useEuiFontSize('xl').fontSize;
    return (
        <EuiPanel css={css`
                    width: 100%;
                    height: 100%;
                `}>
            <Scatter
                data={data}
                xField='RoBERTa Percent Female'
                yField='Percent Girls'
                renderer='svg'
                shape='circle'
                colorField='Name'
                padding='auto'
                color={datum => {
                    if (datum['Name'] === currName) {
                        return highlightColor
                    } else {
                        return euiTheme.colors.lightShade
                    }
                }}
                pointStyle={(datum) => {
                    return {
                        fillOpacity: ((datum['Name'] === currName) ? 1 : 0.6),
                        lineWidth: 0,
                    }
                }}
                brush={{
                    enabled: true
                }}
                legend={false}
                annotations={currPoint.map((pt) => {
                    return {
                        type: 'dataMarker',
                        position: [pt['RoBERTa Percent Female'], pt['Percent Girls']],
                        text: {
                            content: currName,
                            style: {
                                textAlign: 'center',
                                fill: highlightColor,
                                fontSize: fs,
                                fontWeight: euiTheme.font.weight.bold,
                                opacity: 1,
                            },
                        },
                        line: {
                            length: 20,
                            style: {
                                fill: highlightColor,
                                stroke: highlightColor
                            }
                        },
                        point: {
                            style: {
                                fill: highlightColor,
                                stroke: highlightColor,
                                lineWidth: 0,
                            },
                        },
                        direction: (pt['Percent Girls'] > 50) ? 'downward' : 'upward',
                    }
                })}
                xAxis={{
                    title: {
                        text: "RoBERTa's Percent Female"
                    },
                    grid: null
                }}
                yAxis={{
                    title: {
                        text: 'Percent Girls'
                    },
                }}
                size={6}
                tooltip={{
                    title: 'Name',
                    showTitle: true,
                    showCrosshairs: false,
                    fields: ['RoBERTa Percent Female', 'Percent Girls', 'Percent Girls 2021', 'Total Babies'],
                    domStyles: {
                        'g2-tooltip-title': {
                            fontSize: fs,
                            fontWeight: euiTheme.font.weight.bold,
                            textAlign: 'center',
                        }
                    }
                }
                }
                theme={colorMode === 'DARK' ? darkTheme : lightTheme}
            />
        </EuiPanel>
    )
}
