import { EuiBasicTable, EuiDescriptionList, EuiPanel } from "@elastic/eui";

export default function Table({ data, currName }) {
    const items = data.filter((datum) => datum['Name'] === currName);
    if (items.length == 0) {
        return <></>
    } else {
        const item = items[0];
        const columns = [
            {
                title: "Girls",
                description: item["Girls"],
            },
            {
                title: "Boys",
                description: item["Boys"],
            },
            {
                title: "Total",
                description: item["Total Babies"],
            },
            {
                title: "% Girls",
                description: item['Percent Girls'],
            },
            {
                description: item["Percent Girls 2021"],
                title: "% Girls 2021"
            },
            {
                description: item["RoBERTa Percent Female"],
                title: "RoBERTa % Female"
            }
        ]

        return (
            <EuiPanel>
                <EuiDescriptionList
                    type="column"
                    compressed
                    listItems={columns}
                    titleProps={{ className: 'eui-textRight' }}
                    descriptionProps={{ className: 'eui-textRight' }}
                />
            </EuiPanel>
        )
    }
}
