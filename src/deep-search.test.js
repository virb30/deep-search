const { deepSearch, flattenArray } = require("./deep-search");

const options = [
    {
        id: 1,
        label: "Clima e Engajamento",
        parent_id: 0,
        children: [
            {
                id: 11,
                label: "NPS",
                parent_id: 1,
                children: [
                    {
                        id: 111,
                        label: "Engajamento",
                        parent_id: 11,
                        children: [
                            {
                                id: 1111,
                                parent_id: 111,
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
        parent_id: 0
    },
    {
        id: 3,
        label: "Bem-estar",
        parent_id: 0,
        children: [
            {
                id: 31,
                label: "Saúde",
                parent_id: 3
            }
        ]
    },
    {
        id: 4,
        label: "e-NPS",
        parent_id: 0
    },
];

test("Deve filtrar as opções de maneira rasa", () => {
    const filteredOptions = deepSearch(options, "Clima e");
    const expected = [
        {
            id: 1,
            label: "Clima e Engajamento",
            parent_id: 0
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
            parent_id: 0,
            children: [
                {
                    id: 31,
                    label: "Saúde",
                    parent_id: 3
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
            label: "Clima e Engajamento",
            parent_id: 0,
            children: [
                {
                    id: 11,
                    label: "NPS",
                    parent_id: 1,
                }
            ]
        },
        {
            id: 4,
            label: "e-NPS",
            parent_id: 0
        },
    ];

    expect(JSON.stringify(filteredOptions)).toEqual(JSON.stringify(expected));
});

test("Deve filtrar uma opção de maneira profunda nível 3", () => {
    const filteredOptions = deepSearch(options, "Clima");
    const expected = [
        {
            id: 1,
            label: "Clima e Engajamento",
            parent_id: 0,
            children: [
                {
                    id: 11,
                    label: "NPS",
                    parent_id: 1,
                    children: [
                        {
                            id: 111,
                            label: "Engajamento",
                            parent_id: 11,
                            children: [
                                {
                                    id: 1111,
                                    parent_id: 111,
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

// test("Deve achatar o array", () => {

//     const expected = [
//         {
//             id: 1,
//             label: "Clima e Engajamento",
//             parent_id: 0,
//             depth: 0,
//         },
//         {
//             id: 11,
//             label: "NPS",
//             parent_id: 1,
//             depth: 1,
//         },
//         {
//             id: 111,
//             label: "Engajamento",
//             parent_id: 11,
//             depth: 2,
//         },
//         {
//             id: 1111,
//             parent_id: 111,
//             label: "Clima",
//             depth: 3,
//         },
//         {
//             id: 2,
//             label: "Cultura",
//             parent_id: 0,
//             depth: 0,
//         },
//         {
//             id: 3,
//             label: "Bem-estar",
//             parent_id: 0,
//             depth: 0,
//         },
//         {
//             id: 31,
//             label: "Saúde",
//             parent_id: 3,
//             depth: 1,
//         },
//         {
//             id: 4,
//             label: "e-NPS",
//             parent_id: 0,
//             depth: 0,
//         },
//     ];

//     const flattenedArray = flattenArray(options);

//     expect(flattenedArray).toEqual(expected);
// });