import math
import pytest

from bomboni.adapters.web.server import _distance_km


def test_distance_km_same_point_returns_zero() -> None:
    # Distance between identical coordinates must be zero.
    lat, lon = 46.056944, 14.505833
    assert math.isclose(_distance_km(lat, lon, lat, lon), 0.0, abs_tol=1e-7)


def test_distance_km_known_cities() -> None:
    # Distance between Ljubljana and Maribor (~103.65 km).
    ljubljana_lat, ljubljana_lon = 46.056944, 14.505833
    maribor_lat, maribor_lon = 46.554722, 15.646667

    distance = _distance_km(ljubljana_lat, ljubljana_lon, maribor_lat, maribor_lon)
    assert pytest.approx(distance, abs=0.1) == 103.65


def test_distance_km_symmetry() -> None:
    # Distance A->B should equal distance B->A.
    lat1, lon1 = 46.056944, 14.505833
    lat2, lon2 = 45.548056, 13.730278  # Koper

    dist_a_b = _distance_km(lat1, lon1, lat2, lon2)
    dist_b_a = _distance_km(lat2, lon2, lat1, lon1)

    assert math.isclose(dist_a_b, dist_b_a, rel_tol=1e-9)


def test_distance_km_equator_and_meridian() -> None:
    # 1 degree latitude step along equator is ~111.19 km.
    dist_lat = _distance_km(0.0, 0.0, 1.0, 0.0)
    expected_1deg = (math.pi / 180.0) * 6371.0088
    assert pytest.approx(dist_lat, rel=1e-5) == expected_1deg

    # 1 degree longitude step along equator.
    dist_lon = _distance_km(0.0, -0.5, 0.0, 0.5)
    assert pytest.approx(dist_lon, rel=1e-5) == expected_1deg
