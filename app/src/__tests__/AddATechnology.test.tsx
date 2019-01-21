import { mount, ReactWrapper } from 'enzyme';
import { defineFeature, loadFeature } from 'jest-cucumber';
import { DefineScenarioFunction } from 'jest-cucumber/dist/src/feature-definition-creation';
import * as React from 'react';
import { Provider } from 'react-redux';
import App from '../App';
import store from '../utils/store';
import PhaseType from '../models/Phase';
import { MenuItem } from '../components/radarMenu/MenuItem';
import { getRingFactory } from '../models/Rings';
import { findRingPhase } from '../models/Radar';

const feature = loadFeature('./src/__tests__/features/AddATechnology.feature', {
  tagFilter: ['@completed']
});

defineFeature(feature, (test: DefineScenarioFunction) => {
  let wrapper: ReactWrapper;

  beforeAll(() => {
    wrapper = mount(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });

  function getModalWindow(): ReactWrapper {
    return wrapper.find('.modal-window');
  }

  test('Adding a technology', ({ given, when, then }) => {
    given(
      /^I have decided to add a new technology for the (.*) Quadrant$/,
      (quadrant: string) => {
        wrapper
          .find(MenuItem)
          .filterWhere(node => node.props().ring.name === quadrant)
          .find('.plus-one')
          .first()
          .simulate('click');

        expect(store.getState().AppReducer.isModalOpen).toBe(true);
      }
    );

    let techName = '';

    when(/^I enter the (.*) as the name$/, (name: string) => {
      techName = name;
      getModalWindow()
        .find('input.text-input')
        .simulate('change', {
          target: {
            name: 'technologyName',
            value: name
          }
        });
    });

    when(/^I select (.*) as the phase$/, (phase: PhaseType) => {
      getModalWindow()
        .find('.value-list')
        .find('li')
        .filterWhere(node => node.props().title === phase)
        .simulate('click');
    });

    when('I confirm the creation of the technology', () => {
      getModalWindow()
        .find('.modal-actions')
        .find('a')
        .filterWhere(node => node.props().title === 'OK')
        .simulate('click');
    });

    let tech: Technology;

    then('I should see that the technology has been created', () => {
      const { technologies } = store.getState().AppReducer;
      Object.values(technologies).forEach((x, index) => {
        if (x.name === techName) {
          x.index = index;
          tech = x;
        }
      });

      expect(wrapper.find(`#tech-${tech.index}`).exists()).toBe(true);
    });

    then(
      /^it should be in the (.*) ring of the (.*) Quadrant$/,
      (phase: string, quadrant: string) => {
        const { left, top } = tech.canvasPosition;
        const actualQuadrant = getRingFactory(left, top);
        expect(actualQuadrant.name).toBe(quadrant);

        const actualPhase = findRingPhase(left, top);
        expect(actualPhase.type).toBe(phase);
      }
    );
  });
});
