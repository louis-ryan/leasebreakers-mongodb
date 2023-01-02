import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import RentFilter from './RentFilter';

describe('RentFilter component', () => {
    it('renders RentFilter component', () => {
      const { getByText } = render(<RentFilter />);
      const headerElement = getByText(/Rent Filter/);
      expect(headerElement).toBeInTheDocument();
    });
  
    it('renders ReactSlider component with correct props', async () => {
      const { getByTestId } = render(<RentFilter />);
  
      // Wait for the component to finish loading data from the API
      await wait(() => getByTestId('react-slider'));
  
      // Get the ReactSlider component
      const sliderElement = getByTestId('react-slider');
  
      // Check that the min and max values of the ReactSlider component match the minVal and maxVal state variables
      expect(sliderElement.props.min).toEqual(minVal);
      expect(sliderElement.props.max).toEqual(maxVal);
    });
  
    it('sets filter correctly when ReactSlider values are changed', async () => {
      const setFilterMock = jest.fn();
      const { getByTestId } = render(<RentFilter setFilter={setFilterMock} />);
  
      // Wait for the component to finish loading data from the API
      await wait(() => getByTestId('react-slider'));
  
      // Get the ReactSlider component
      const sliderElement = getByTestId('react-slider');
  
      // Change the values of the ReactSlider component
      fireEvent.change(sliderElement, { target: { value: [500, 1500] } });
  
      // Check that the setFilter function was called with the correct arguments
      expect(setFilterMock).toHaveBeenCalledWith({
        selectedRentVal: [500, 1500],
        minRentVal: minVal,
        maxRentVal: maxVal
      });
    });
  });
  