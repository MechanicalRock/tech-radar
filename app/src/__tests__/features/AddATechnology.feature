Feature: Adding a Technology
    As a Mech Rocker
    I want to add a Technology
    So that I can acknowledge it's position on my radar

    @completed
    Scenario: Adding a technology
        Given I have decided to add a new technolgy for the "Operate" Quadrant
        When I enter the "Sumo" as the name
        And I select "Trial" as the phase
        And I confirm the creation of the technology
        Then I should see that the technology has been created
        And it should be in the "Trial" ring of the "Operate" Quadrant

