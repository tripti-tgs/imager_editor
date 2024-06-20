import React, { useRef, useState } from "react";

interface FilterComponentProps {
  filters: {
    Grayscale: boolean;
    Invert: boolean;
    Sepia: boolean;
    Vintage: boolean;
    Blur: boolean;
    Sharpen: boolean;
    Emboss: boolean;
    removeColor: boolean;
    removeColorDistance: number;
    Brightness: boolean;
    BrightnessValue: number;
    Noise: boolean;
    NoiseValue: number;
    Pixelate: boolean;
    PixelateValue: number;
    Tint: boolean;
    TintColor: string;
    TintOpacity: number;
    Multiply: boolean;
    MultiplyColor: string;
    Blend: boolean;
    BlendMode: string;
    BlendColor: string;
    ColorFilter: boolean;
    ColorFilterValue: number;
    // Add more filters as needed
  };
  applyOrRemoveFilter: (
    applying: boolean | number | string,
    type: string,
    options: any
  ) => void;
  setFilters: React.Dispatch<
    React.SetStateAction<{
      Grayscale: boolean;
      Invert: boolean;
      Sepia: boolean;
      Vintage: boolean;
      Blur: boolean;
      Sharpen: boolean;
      Emboss: boolean;
      removeColor: boolean;
      removeColorDistance: number;
      Brightness: boolean;
      BrightnessValue: number;
      Noise: boolean;
      NoiseValue: number;
      Pixelate: boolean;
      PixelateValue: number;
      Tint: boolean;
      TintColor: string;
      TintOpacity: number;
      Multiply: boolean;
      MultiplyColor: string;
      Blend: boolean;
      BlendMode: string;
      BlendColor: string;
      ColorFilter: boolean;
      ColorFilterValue: number;
    }>
  >;
}

const FilterComponent: React.FC<FilterComponentProps> = ({
  setFilters,
  filters,
  applyOrRemoveFilter,
}) => {
  const applyFilterTimeout = useRef<NodeJS.Timeout | null>(null);
  const [modeofBlend, setModeofBlend] = useState<any>([
    "add",
    "diff",
    "subtract",
    "multiply",
    "screen",
    "lighten",
    "darken",
  ]);

  const handleChange = (
    stateValue: keyof FilterComponentProps["filters"],
    type: keyof FilterComponentProps["filters"],
    newValue: boolean | number | string,
    value: any
  ) => {
    // Update the local state immediately
    setFilters((prevFilters) => ({
      ...prevFilters,
      [stateValue]: newValue,
    }));

    // Clear existing timeout for the same type
    if (applyFilterTimeout.current) {
      clearTimeout(applyFilterTimeout.current);
    }

    // Set a new timeout to apply the filter after a delay (100ms in this case)
    applyFilterTimeout.current = setTimeout(() => {
      applyOrRemoveFilter(newValue, type, value);
    }, 100); // Adjust delay as needed
  };

  return (
    <div>
      {/* Grayscale filter */}
      <label>
        <input
          type="checkbox"
          id="inputCheckGrayscale"
          checked={filters.Grayscale}
          onChange={(e) =>
            handleChange("Grayscale", "Grayscale", e.target.checked, null)
          }
        />
        Grayscale
      </label>
      {/* Invert filter */}
      <label>
        <input
          type="checkbox"
          id="inputCheckInvert"
          checked={filters.Invert}
          onChange={(e) =>
            handleChange("Invert", "Invert", e.target.checked, null)
          }
        />
        Invert
      </label>
      {/* Sepia filter */}
      <label>
        <input
          type="checkbox"
          id="inputCheckSepia"
          checked={filters.Sepia}
          onChange={(e) =>
            handleChange("Sepia", "Sepia", e.target.checked, null)
          }
        />
        Sepia
      </label>
      {/* Vintage filter */}
      <label>
        <input
          type="checkbox"
          id="inputCheckVintage"
          checked={filters.Vintage}
          onChange={(e) =>
            handleChange("Vintage", "Vintage", e.target.checked, null)
          }
        />
        Vintage
      </label>
      {/* Blur filter */}
      <label>
        <input
          type="checkbox"
          id="inputCheckBlur"
          checked={filters.Blur}
          onChange={(e) =>
            handleChange("Blur", "Blur", e.target.checked, { blur: 0.1 })
          }
        />
        Blur
      </label>
      {/* Sharpen filter */}
      <label>
        <input
          type="checkbox"
          id="inputCheckSharpen"
          checked={filters.Sharpen}
          onChange={(e) =>
            handleChange("Sharpen", "Sharpen", e.target.checked, null)
          }
        />
        Sharpen
      </label>
      {/* Emboss filter */}
      <label>
        <input
          type="checkbox"
          id="inputCheckEmboss"
          checked={filters.Emboss}
          onChange={(e) =>
            handleChange("Emboss", "Emboss", e.target.checked, null)
          }
        />
        Emboss
      </label>
      {/* RemoveColor filter */}
      <div>
        <label>
          <input
            type="checkbox"
            id="inputCheckremoveColor"
            checked={filters.removeColor}
            onChange={(e) =>
              handleChange("removeColor", "removeColor", e.target.checked, {
                color: "#FFFFFF",
                useAlpha: false,
                distance: filters.removeColorDistance / 255,
              })
            }
          />
          RemoveWhite
        </label>
        <input
          type="range"
          id="inputRangeRemoveColorDistance"
          min="1"
          max="255"
          value={filters.removeColorDistance}
          onChange={(e) =>
            handleChange(
              "removeColorDistance",
              filters.removeColor ? "removeColor" : "removeColorDistance",
              parseInt(e.target.value, 10),
              {
                color: "#fff",
                useAlpha: false,
                distance: parseInt(e.target.value, 10) / 255,
              }
            )
          }
        />
      </div>

      {/* Brightness filter */}
      <div>
        <label>
          <input
            type="checkbox"
            id="inputCheckBrightness"
            checked={filters.Brightness}
            onChange={(e) => {
              handleChange("Brightness", "Brightness", e.target.checked, {
                brightness: filters.BrightnessValue / 255,
              });
            }}
          />
          Brightness
        </label>
        <input
          type="range"
          id="inputRangeBrightnessValue"
          min="1"
          max="255"
          value={filters.BrightnessValue}
          onChange={(e) => {
            let newBrightnessValue = parseInt(e.target.value, 10);
            handleChange(
              "BrightnessValue",
              filters.Brightness ? "Brightness" : "BrightnessValue",
              newBrightnessValue,
              {
                brightness: newBrightnessValue / 255,
              }
            );
          }}
        />
      </div>
      {/* Noise filter */}
      <div>
        <label>
          <input
            type="checkbox"
            id="inputCheckNoise"
            checked={filters.Noise}
            onChange={(e) => {
              handleChange("Noise", "Noise", e.target.checked, {
                noise: filters.NoiseValue,
              });
            }}
          />
          Noise
        </label>
        <input
          type="range"
          id="inputRangeNoise"
          min="1"
          max="255"
          value={filters.NoiseValue}
          onChange={(e) =>
            handleChange(
              "NoiseValue",
              filters.Noise ? "Noise" : "NoiseValue",
              parseInt(e.target.value, 10),
              {
                noise: parseInt(e.target.value, 10),
              }
            )
          }
        />
      </div>

      {/* Pixelate filter */}
      <div>
        <label>
          <input
            type="checkbox"
            id="inputCheckPixelate"
            checked={filters.Pixelate}
            onChange={(e) => {
              handleChange("Pixelate", "Pixelate", e.target.checked, {
                blocksize: filters.PixelateValue,
              });
            }}
          />
          Pixelate
        </label>
        <input
          type="range"
          id="inputRangePixelateValue"
          min="1"
          max="255"
          value={filters.PixelateValue}
          onChange={(e) =>
            handleChange(
              "PixelateValue",
              filters.Pixelate ? "Pixelate" : "PixelateValue",
              parseInt(e.target.value, 10),
              {
                blocksize: parseInt(e.target.value, 10),
              }
            )
          }
        />
      </div>

      {/* Tint filter */}
      <div>
        <label>
          <input
            type="checkbox"
            id="inputCheckTint"
            checked={filters.Tint}
            onChange={(e) => {
              handleChange("Tint", "BlendColor", e.target.checked, {
                mode: "tint",
                color: filters.TintColor,
                alpha: filters.TintOpacity,
              });
            }}
          />
          Tint
        </label>
        <input
          type="range"
          id="inputRangeTintOpacity"
          min="0"
          step="0.1"
          max="2"
          onChange={(e) =>
            handleChange(
              "TintOpacity",
              filters.Tint ? "BlendColor" : "TintOpacity",
              e.target.value,
              {
                mode: "tint",
                color: filters.TintColor,
                alpha: filters.TintOpacity,
              }
            )
          }
        />
        <input
          type="color"
          id="inputRangeTintColor"
          value={filters.TintColor}
          onChange={(e) =>
            handleChange(
              "TintColor",
              filters.Tint ? "BlendColor" : "TintColor",
              e.target.value,
              {
                mode: "tint",
                color: e.target.value,
                alpha: filters.TintOpacity,
              }
            )
          }
        />
      </div>

      {/* Multiply filter */}
      <div>
        <label>
          <input
            type="checkbox"
            id="inputCheckMultiply"
            checked={filters.Multiply}
            onChange={(e) => {
              handleChange("Multiply", "BlendColor", e.target.checked, {
                color: filters.MultiplyColor,
              });
            }}
          />
          Multiply
        </label>

        <input
          type="color"
          id="inputRangeMultiplyColor"
          value={filters.MultiplyColor}
          onChange={(e) =>
            handleChange(
              "MultiplyColor",
              filters.Multiply ? "BlendColor" : "MultiplyColor",
              e.target.value,
              {
                color: e.target.value,
              }
            )
          }
        />
      </div>

      {/* Blend filter */}
      <div>
        <label>
          <input
            type="checkbox"
            id="inputCheckBlend"
            checked={filters.Blend}
            onChange={(e) => {
              handleChange("Blend", "BlendColor", e.target.checked, {
                color: filters.BlendColor,
                mode: filters.BlendMode,
              });
            }}
          />
          Blend
        </label>

        <input
          type="color"
          id="inputRangeBlendColor"
          value={filters.BlendColor}
          onChange={(e) =>
            handleChange(
              "BlendColor",
              filters.Blend ? "BlendColor" : "MultiplyColor",
              e.target.value,
              {
                color: e.target.value,
                mode: filters.BlendMode,
              }
            )
          }
        />
        <select
          onChange={(e) =>
            handleChange(
              "BlendMode",
              filters.Blend ? "BlendColor" : "MultiplyColor",
              e.target.value,
              {
                color: filters.BlendColor,
                mode: e.target.value,
              }
            )
          }
        >
          {modeofBlend.map((m: string) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterComponent;

