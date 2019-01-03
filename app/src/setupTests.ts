import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as radar from '../src/models/Radar';

jest.spyOn(radar, 'paintRadar').mockImplementation();

configure({ adapter: new Adapter() });
