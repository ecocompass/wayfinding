import * as NavigationService from 'wayfinding/components/Navigation/RootNavigator.tsx'; // Update with the correct path
import { createNavigationContainerRef } from '@react-navigation/native';

describe('Navigation Service', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    // Reset the mock before each test
    mockNavigate.mockReset();
    NavigationService.navigationRef.current = {
      navigate: mockNavigate,
      isReady: jest.fn().mockReturnValue(true),
    };
  });

  it('navigates to the correct screen with parameters', () => {
    const routeName = 'TestScreen';
    const params = { param1: 'value1' };

    NavigationService.navigate(routeName, params);

    expect(NavigationService.navigationRef.current.isReady).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith(routeName, params);
  });

  it('does not navigate if the navigation ref is not ready', () => {
    NavigationService.navigationRef.current.isReady = jest.fn().mockReturnValue(false);
    NavigationService.navigate('TestScreen', {});

    expect(NavigationService.navigationRef.current.isReady).toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  // Add more tests as necessary
});
