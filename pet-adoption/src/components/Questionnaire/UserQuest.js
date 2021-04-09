var userjson = 
{
  pages: [
   {
    name: "page1",
    elements: [
     {
      type: "dropdown",
      name: "AgeGroup",
      title: "What is your Age group?",
      isRequired: true,
      choices: [
       {
        value: "0",
        text: "Under 18"
       },
       {
        value: "18",
        text: "18-30"
       },
       {
        value: "30",
        text: "30-50"
       },
       {
        value: "50",
        text: "50+"
       }
      ]
     },
     {
      type: "panel",
      name: "panel1",
      elements: [
       {
        type: "radiogroup",
        name: "PetBefore",
        title: "Have you had a pet before?",
        choices: [
         {
          value: "Yes",
          text: "Yes"
         },
         {
          value: "No",
          text: "No"
         }
        ],
        otherText: "No"
       },
       {
        type: "radiogroup",
        name: "OwnPet",
        visibleIf: "{PetBefore} = 'Yes'",
        title: "Do you currently own a pet?",
        hideNumber: true,
        requiredIf: "{PetBefore} = 'Yes'",
        choices: [
         "Yes",
         "No"
        ]
       },
       {
        type: "text",
        name: "OwnPetNumber",
        visibleIf: "{OwnPet} = 'Yes' and {PetBefore} = 'Yes'",
        title: "How many pets do you currently own?",
        description: "(Applies to pets that are required to receive vaccines)",
        hideNumber: true,
        requiredIf: "{OwnPet} = 'Yes'",
        inputType: "number",
        min: "1",
        max: "99"
       },
       {
        type: "radiogroup",
        name: "OwnPetVaccine",
        visibleIf: "{OwnPet} = 'Yes' and {PetBefore} = 'Yes'",
        title: "Are your pets up to date with vaccines?",
        hideNumber: true,
        requiredIf: "{OwnPet} = 'Yes'",
        choices: [
         {
          value: "Yes",
          text: "Yes"
         },
         {
          value: "No",
          text: "No"
         }
        ]
       }
      ]
     },
     {
      type: "radiogroup",
      name: "Living",
      title: "What best describes your living environment?",
      isRequired: true,
      choices: [
       {
        value: "House",
        text: "House"
       },
       {
        value: "Condo",
        text: "Condo"
       },
       {
        value: "Townhome",
        text: "Townhome"
       },
       {
        value: "No Yard",
        text: "No Yard"
       },
       {
        value: "Large Yard",
        text: "Large Yard"
       },
       {
        value: "Small Yard",
        text: "Small Yard"
       },
       {
        value: "Acreage",
        text: "Acreage"
       }
      ],
      hasOther: true,
      noneText: "Acreage",
      otherText: "Apartment"
     },
     {
      type: "multipletext",
      name: "People",
      title: "Please input the number of people in your household in their age group:",
      description: "Put 0 for none\n",
      isRequired: true,
      items: [
       {
        name: "Adult",
        isRequired: true,
        inputType: "number",
        title: "Adults (18+)"
       },
       {
        name: "Teenagers",
        isRequired: true,
        inputType: "number",
        title: "Teenagers (13-17)"
       },
       {
        name: "Children",
        isRequired: true,
        inputType: "number",
        title: "Children (Below 13)"
       }
      ]
     },
     {
      type: "panel",
      name: "panel2",
      elements: [
       {
        type: "radiogroup",
        name: "HaveVet",
        title: "Do you have Veterinarian?",
        isRequired: true,
        choices: [
         {
          value: "Yes",
          text: "Yes"
         },
         {
          value: "No",
          text: "No"
         }
        ]
       },
       {
        type: "dropdown",
        name: "GotoVet",
        visibleIf: "{HaveVet} = 'Yes'",
        title: "How often should your pet be examined by a veterinarian?",
        requiredIf: "{HaveVet} = 'Yes'",
        choices: [
         {
          value: "Bi-Annually",
          text: "Bi-Annually"
         },
         {
          value: "Annually",
          text: "Annually"
         },
         {
          value: "A Month",
          text: "A Month"
         }
        ]
       }
      ]
     },
     {
      type: "checkbox",
      name: "PetDiet",
      title: "What is the best diet for your pet?",
      description: "(Check all that applies)",
      isRequired: true,
      choices: [
       {
        value: "Dry",
        text: "Dry"
       },
       {
        value: "Wet",
        text: "Wet"
       },
       {
        value: "Raw",
        text: "Raw"
       },
       {
        value: "Homemade",
        text: "Homemade"
       },
       {
        value: "Leftovers",
        text: "Leftovers"
       },
       {
        value: "Vet Recommended",
        text: "Vet Recommended"
       }
      ],
      hasOther: true
     },
     {
      type: "radiogroup",
      name: "PetCost",
      title: "How much do you think you'll spend annually on your pet?",
      isRequired: true,
      choices: [
       {
        value: "100",
        text: "$100-500"
       },
       {
        value: "500",
        text: "$500-1000"
       },
       {
        value: "1000",
        text: "$1000-2000"
       },
       {
        value: "2000",
        text: "$2000+"
       }
      ]
     },
     {
      type: "checkbox",
      name: "PetImportance",
      title: "It is very important that my pet...",
      description: "(Check all that applies)",
      choices: [
       {
        value: "Is friendly with Children",
        text: "Is friendly with Children"
       },
       {
        value: "Is friendly with Other Pets",
        text: "Is friendly with Other Pets"
       },
       {
        value: "Is friendly with Visitors",
        text: "Is friendly with Visitors"
       },
       {
        value: "Enjoys human touch",
        text: "Enjoys human touch"
       },
       {
        value: "Is Calm",
        text: "Is Calm"
       },
       {
        value: "Is Playful",
        text: "Is Playful"
       },
       {
        value: "Is Independent",
        text: "Is Independent"
       }
      ],
      hasNone: true,
      hasSelectAll: true
     },
     {
      type: "checkbox",
      name: "PetTraining",
      title: "Which of the following would you be willing to train your pet with?",
      description: "(Check if the skill applies to your pet and you are willing to train it)",
      choices: [
       {
        value: "House Training",
        text: "House Training"
       },
       {
        value: "Separation Anxiety",
        text: "Separation Anxiety"
       },
       {
        value: "Food and Toy Possessiveness",
        text: "Food and Toy Possessiveness"
       },
       {
        value: "Shy Behaviour",
        text: "Shy Behaviour"
       },
       {
        value: "Aggression",
        text: "Aggression"
       },
       {
        value: "Socialization",
        text: "Socialization"
       },
       {
        value: "Leash",
        text: "Leash (If applicable)"
       }
      ],
      hasNone: true
     },
     {
      type: "text",
      name: "FullLegalName",
      title: "Please Input your Full Legal Name",
      isRequired: true
     }
    ]
   }
  ],
  showPreviewBeforeComplete: "showAnsweredQuestions"
 }

export { userjson };