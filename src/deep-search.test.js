const { deepSearch } = require("./deep-search");

const options = [
    {
        id: 1,
        label: "Engajamento e clim",
        children: [
            {
                id: 11,
                label: "NPS",
                children: [
                    {
                        id: 111,
                        label: "Engajamento",
                        children: [
                            {
                                id: 1111,
                                label: "Clima",
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        id: 2,
        label: "Cultura",
    },
    {
        id: 3,
        label: "Bem-estar",
        children: [
            {
                id: 31,
                label: "Saúde",
            }
        ]
    },
    {
        id: 4,
        label: "e-NPS",
    },
];

test("Deve filtrar as opções de maneira rasa", () => {
    const filteredOptions = deepSearch(options, "e clim");
    const expected = [
        {
            id: 1,
            label: "Engajamento e clim",
        },
    ];

    expect(JSON.stringify(filteredOptions)).toEqual(JSON.stringify(expected));
});

test("Deve filtrar uma opção sem filhos", () => {
    const filteredOptions = deepSearch(options, "Cult");
    const expected = [
        {
            id: 2,
            label: "Cultura",
        },
    ];

    expect(JSON.stringify(filteredOptions)).toEqual(JSON.stringify(expected));
});

test("Deve filtrar uma opção de maneira profunda", () => {
    const filteredOptions = deepSearch(options, "Saúde");
    const expected = [
        {
            id: 3,
            label: "Bem-estar",
            children: [
                {
                    id: 31,
                    label: "Saúde",
                }
            ]
        },
    ];

    expect(JSON.stringify(filteredOptions)).toEqual(JSON.stringify(expected));
});

test("Deve filtrar mais de uma opção de maneira profunda", () => {
    const filteredOptions = deepSearch(options, "NPS");
    const expected = [
        {
            id: 1,
            label: "Engajamento e clim",
            children: [
                {
                    id: 11,
                    label: "NPS",
                }
            ]
        },
        {
            id: 4,
            label: "e-NPS",
        },
    ];

    expect(JSON.stringify(filteredOptions)).toEqual(JSON.stringify(expected));
});

test("Deve filtrar uma opção de maneira profunda nível 3", () => {
    const filteredOptions = deepSearch(options, "Clima");
    const expected = [
        {
            id: 1,
            label: "Engajamento e clim",
            children: [
                {
                    id: 11,
                    label: "NPS",
                    children: [
                        {
                            id: 111,
                            label: "Engajamento",
                            children: [
                                {
                                    id: 1111,
                                    label: "Clima",
                                }
                            ]
                        }
                    ]
                }
            ]
        },
    ];

    expect(JSON.stringify(filteredOptions)).toEqual(JSON.stringify(expected));
});