Feature: Adding a Technology
    As a Mech Rocker
    I want to add a Technology
    So that I can acknowledge it's position on my radar

    @completed
    Scenario Outline: Adding a technology
        Given I have decided to add a new technology for the <Quadrant> Quadrant
        When I enter the <Technology> as the name
        And I select <Phase> as the phase
        And I confirm the creation of the technology
        Then I should see that the technology has been created
        And it should be in the <Phase> ring of the <Quadrant> Quadrant

        Examples:
            | Quadrant | Technology | Phase |
            | Operate  | Sumo       | Trial |
            | Develop  | Git        | Adopt |

