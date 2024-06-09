
## Create a viz config file

Create a file `CMakeGraphVizOptions.cmake` along size top level `CMakeLists.txt`, in `packages/react-native/ReactAndroid/src/main/jni/CMakeGraphVizOptions.cmake`

```cmake
# CMakeGraphVizOptions.cmake

# Set the output format (e.g., "svg", "png", "pdf")
set(GRAPHVIZ_OUTPUT_FORMAT "svg")

# Set the graph type (e.g., "digraph", "graph")
set(GRAPHVIZ_GRAPH_TYPE "digraph")

# Set the graph label
set(GRAPHVIZ_GRAPH_LABEL "Project Dependency Graph")

# Set the node options
set(GRAPHVIZ_NODE_OPTIONS
    "shape=box"
    "fontname=Courier"
    "fontsize=10"
    "margin=0.2"
)

# Set the edge options
set(GRAPHVIZ_EDGE_OPTIONS
    "fontname=Courier"
    "fontsize=8"
    "labelfontcolor=grey"
)

# Set the graph-level options
set(GRAPHVIZ_GRAPH_OPTIONS
    "bgcolor=white"
    "rankdir=TB"
    "ranksep=1.0"
    "nodesep=0.8"
)
```

## Include visualization options file in CMakeLists.txt

In `packages/react-native/ReactAndroid/src/main/jni/CMakeLists.txt`
```cmake
# CMakeLists.txt

# ... existing content
include(CMakeGraphVizOptions.cmake)

# ... existing content
```

## Modify `build.gradle` which invokes CMake (to include dot output option)

```gradle
        externalNativeBuild {
            cmake {
                arguments "-DREACT_COMMON_DIR=${reactNativeRootDir}/ReactCommon",
                    "-DREACT_ANDROID_DIR=$projectDir",
                    "-DREACT_BUILD_DIR=$buildDir",
                    "-DANDROID_STL=c++_shared",
                    "-DANDROID_TOOLCHAIN=clang",
                    "-DANDROID_PLATFORM=android-21",
                    // Due to https://github.com/android/ndk/issues/1693 we're losing Android
                    // specific compilation flags. This can be removed once we moved to NDK 25/26
                    "-DANDROID_USE_LEGACY_TOOLCHAIN_FILE=ON",
                    "--graphviz=${buildDir}/graphviz.dot" // This is new!
```
