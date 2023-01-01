import React, { FunctionComponent } from 'react';
import Head from 'next/head';
import { EuiComboBox, EuiFlexGrid, EuiFlexGroup, EuiFlexItem, EuiPageTemplate, EuiSpacer, EuiTab, EuiTabbedContent, EuiTabs } from '@elastic/eui';
import scatter from '../../public/scatter.json';
import years from '../../public/years.json';
import ScatterPlot from '../components/scatter';
import Table from '../components/table'
import ThemeSwitcher from '../components/chrome/theme_switcher';
import { css } from '@emotion/react';
import LinePlot from '../components/line';

function Index({ data, years }) {
    const opts = React.useMemo(() => data.map((datum, i) => {
        return {
            label: datum['Name'],
        }
    }), [data]);

    const names = React.useMemo(() => data.map(x => x['Name']), [data]);

    const [currName, setCurrName] = React.useState('');
    return (
        <>
            <EuiPageTemplate panelled css={css`
                height: 100vh;
            `}>
                <EuiPageTemplate.Sidebar sticky>
                    <ThemeSwitcher />
                    <EuiSpacer size='l' />
                    <EuiComboBox
                        aria-label="Name"
                        placeholder="Enter a name"
                        singleSelection={{
                            asPlainText: true
                        }}
                        options={opts}
                        sortMatchesBy='startsWith'
                        selectedOptions={opts.filter((opt) => opt.label === currName)}
                        onChange={(names) => names.forEach((name) => setCurrName(name.label))}
                    />
                    <EuiSpacer size='l' />
                    <Table data={data} currName={currName} />
                </EuiPageTemplate.Sidebar>
                <EuiPageTemplate.Section css={css`
                    height: 100%;
                `} grow contentProps={{
                        css: css`
                    height: 100%;
                `
                    }}>
                    <EuiTabbedContent
                        expand
                        css={css`
                        height: 100%;
                        div[role=tabpanel] {
                            height: calc(100% - 40px);
                        }
                    `}
                        tabs={[
                            {
                                id: 'scatter',
                                name: 'AI vs. Actual Gender Scatter',
                                content: <ScatterPlot data={data} currName={currName} />
                            },
                            {
                                id: 'line',
                                name: 'Births Over Time',
                                content: <LinePlot data={years} currName={currName} />
                            }
                        ]}
                    />
                </EuiPageTemplate.Section>
            </EuiPageTemplate>
        </>
    );
};

export default Index;

export async function getStaticProps() {
    return {
        props: {
            data: scatter,
            years: years
        }
    }
}
